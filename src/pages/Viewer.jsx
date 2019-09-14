import React, {useState, useEffect} from 'react'
import "./viewer.css"
import LoadingBar from 'react-top-loading-bar'
import Plyr from 'plyr';
import {MDBContainer, MDBRow, MDBCol, MDBIcon, MDBAlert, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBListGroup, MDBListGroupItem} from 'mdbreact'
import * as is_video from 'is-video'
import {connect} from 'react-redux'
import MovieInfo from '../components/MovieInfo';
import actions from '../store/actions';
import FileList from '../components/FileList';

var WebTorrent = require('webtorrent');

const Viewer = ({magnet, poster, title, updateTitle, history}) => {
    const [downloadProgress, updateDownloadProgress] = useState(0)
    const [downloaded, updateDownloaded] = useState(0)
    const [totalSize, updateTotalSize] = useState(0)
    const [dlSpeed, updateDlSpeed] = useState(0)
    const [remaining, updateRemaining] = useState(0)
    const [choices, updateChoices] = useState([])
    const [allFiles, updateAllFiles] = useState([])
    const [showChoiceModal, updateShowChoiceModal] = useState(false)

    const changeTorrent = (magnet, client) => {
        let video = document.getElementById("basePlayer")
        // add magnet link to webtorrent client
        client.add(magnet, (torrent) => {
            updateTotalSize(Math.floor(torrent.length / 1000 / 1000))
            updateTitle(torrent.name)
            console.log("got the torrent", torrent.name) // for debug only
            torrent.on("done", () => {
                let files = []
                // eslint-disable-next-line
                torrent.files.map((file) => {
                    file.getBlobURL((err, url) => {
                        files.push({name:file.name, url})

                        updateAllFiles(files) // files to be downloaded
                    })
                })
                updateDownloadProgress(100)
            })
            // each time a bit of torrent is downloaded, update progress bar and stats
            torrent.on("download", () => {
                updateDownloadProgress(torrent.progress * 100)
                updateDownloaded(Math.floor(torrent.downloaded / 1000 / 1000))
                updateDlSpeed(Math.floor(torrent.downloadSpeed / 1000 / 1000))
                updateRemaining(Math.floor(torrent.timeRemaining / 1000))
            })
            let playable_files = []
            // eslint-disable-next-line
            torrent.files.map((file) => {
                if (is_video(file.name)) {
                    playable_files.push(file) // if file is a video, add it to video list
                }
            })
            if (playable_files.length === 1) { // if there is only one file, play it
                let file = playable_files[0]
                file.renderTo("video#basePlayer", {maxBlobLength:1000 * 1000 * 20 * 1000} ,(err, elem) => {
                if (err) throw err; 
                })
                return
            } else {
                updateChoices(playable_files)
                updateShowChoiceModal(true)
            }
        })
    }
    //updates poster if change is detected
    useEffect(() => {
        if (poster !== "") {
            document.getElementById("basePlayer").poster = poster
        }
    }, [poster])
    useEffect(() => {
        new Plyr("#basePlayer")
        
        let client = new WebTorrent();
    
        client.on('error', err => {
          console.log('[-] Webtorrent error: ' + err.message);
        });
        updateTitle("")
        changeTorrent(magnet, client)
        // eslint-disable-next-line
    }, [magnet])
    return (
        <MDBContainer fluid>
                <MDBRow>
                    <MDBCol md="3">
                        <MDBIcon icon="angle-left" size="3x" onClick={() => {
                            updateTitle("")
                            history.push("/")
                            }
                        } />
                    </MDBCol>
                </MDBRow>
                <MDBModal isOpen={showChoiceModal} toggle={() => this.setState({showChoiceModal:!showChoiceModal})}>
                    <MDBModalHeader>Choose what to play</MDBModalHeader>
                    <MDBModalBody>
                        <MDBListGroup>
                        {choices.map((file) => (
                            <MDBListGroupItem key={file.length} onClick={() => {
                                file.renderTo("video#basePlayer")
                                this.setState({
                                    showChoiceModal:false
                                })
                            }}>{file.name}</MDBListGroupItem>
                        ))}
                        </MDBListGroup>
                    </MDBModalBody>
                    <MDBModalFooter>

                    </MDBModalFooter>
                </MDBModal>
                <h2 className="text-center mb-2">TorrVision</h2>
                <LoadingBar progress={downloadProgress} height={8} color='red' />
                {totalSize > 200 && downloadProgress !== 100 && <MDBAlert color="danger">This file is too large to play while downloading. Please wait for it to finish download</MDBAlert>}
                <h2 className="text-center mt-4">{title}</h2>
                {downloadProgress === 0 && <h4 className="text-center">Looking for peers...</h4>}
                {downloadProgress > 0 && downloadProgress < 100 && <h4 className="text-center">{downloaded}/{totalSize} MB dowloaded at {dlSpeed} Mb/sec {remaining} seconds remaining</h4>}
                <MDBRow center id="videoContainer" className="mt-5 pt-5">
                    <MDBCol size="8">
                    {<video id="basePlayer" controls/>}
                    </MDBCol>
                    <MDBCol size="4">
                        {<MovieInfo/>}
                    </MDBCol>
                </MDBRow>
                <MDBRow className="mt-5 mb-3">
                    <h4 className="text-center ml-2">Files Downloaded</h4>
                    <MDBCol size="12">
                            <FileList files={allFiles} />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
    )
}

const mapStateToProps = state => {
    return (
        {
            magnet:state.magnet,
            poster:state.poster,
            title:state.title
        }
    )
}

const mapDispatchToProps = dispatch => {
    return {
        updateTitle: title => dispatch(actions.changeTitle(title))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Viewer)