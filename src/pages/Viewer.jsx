import React from 'react'
import "./viewer.css"
import LoadingBar from 'react-top-loading-bar'
import Plyr from 'plyr';
import {MDBContainer, MDBRow, MDBCol, MDBInput, MDBSpinner, MDBIcon, MDBAlert, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBListGroup, MDBListGroupItem} from 'mdbreact'
import * as is_video from 'is-video'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import MovieInfo from '../components/MovieInfo';
import actions from '../store/actions';
import FileList from '../components/FileList';

var WebTorrent = require('webtorrent');

const getFileExtension = (name) => {
    return (name.substring(name.lastIndexOf('.')+1, name.length) || name)
}

class Viewer extends React.Component {
    state = {
        downloadProgress:0,
        title:"",
        player:"hidden",
        loading:true,
        dowloaded:0,
        totalSize:0,
        dlSpeed:0,
        remaining:0,
        choices:[],
        allFiles:[],
        showChoiceModal:false
    }
    componentDidMount() {
        //player setup
        new Plyr("#basePlayer")
        
        this.client = new WebTorrent();
    
        this.client.on('error', err => {
          console.log('[-] Webtorrent error: ' + err.message);
        });
        this.changeTorrent(this.props.magnet)
    }
    changeTorrent = (e) => {
        this.setState({
            downloadProgress:0,
            loading:true
        })
        console.log(`adding torrent with magnet ${e}`)
        this.props.updateTitle("")
        this.client.add(e, (torrent) => {
            this.setState({totalSize:Math.floor(torrent.length / 1000 / 1000)})
            this.props.updateTitle(torrent.name)
            console.log("got the torrent", torrent.name)
            torrent.on("done", () => {
                let files = []
                torrent.files.map((file) => {
                    file.getBlobURL((err, url) => {
                        files.push({name:file.name, url})
                    })
                })
                this.setState({downloadProgress:100, allFiles:files});

            })
            torrent.on("download", () => {
                this.setState({downloadProgress:torrent.progress * 100, dowloaded:Math.floor(torrent.downloaded / 1000 / 1000), dlSpeed:Math.floor(torrent.downloadSpeed / 1000 / 1000), remaining:Math.floor(torrent.timeRemaining / 1000)})
                if (this.state.player === "hidden") {
                    this.setState({player:"visible"})
                }
            })
            let playable_files = []
            torrent.files.map((file) => {
                if (is_video(file.name)) {
                    playable_files.push(file)
                }
            })
            if (playable_files.length === 1) {
                let file = playable_files[0]
                file.renderTo("video#basePlayer", {maxBlobLength:1000 * 1000 * 20 * 1000} ,(err, elem) => {
                if (err) throw err; 
                    this.setState({player:"visible", loading:false})
                })
                return
            } else {
                this.setState({
                    choices:playable_files,
                    showChoiceModal:true
                })
            }
        })
    }
    componentDidUpdate(prevProps) {
        if (prevProps.poster !== this.props.poster) {
            let video = document.getElementById("basePlayer").poster = this.props.poster
        }
    }
    render() {
        let style = {
            visibility: this.state.player
        }
        return(
            <MDBContainer fluid>
                <MDBRow>
                    <MDBCol md="3">
                        <MDBIcon icon="angle-left" size="3x" onClick={() => {
                            this.props.updateTitle("")
                            this.props.history.push("/")
                            }
                        } />
                    </MDBCol>
                </MDBRow>
                <MDBModal isOpen={this.state.showChoiceModal} toggle={() => this.setState({showChoiceModal:!this.state.showChoiceModal})}>
                    <MDBModalHeader>Choose what to play</MDBModalHeader>
                    <MDBModalBody>
                        <MDBListGroup>
                        {this.state.choices.map((file) => (
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
                <LoadingBar progress={this.state.downloadProgress} height={8} color='red' />
                {this.state.totalSize > 200 && this.state.downloadProgress !== 100 && <MDBAlert color="danger">This file is too large to play while downloading. Please wait for it to finish download</MDBAlert>}
                <h2 className="text-center mt-4">{this.props.title}</h2>
                {this.state.downloadProgress === 0 && <h4 className="text-center">Looking for peers...</h4>}
                {this.state.downloadProgress > 0 && this.state.downloadProgress < 100 && <h4 className="text-center">{this.state.dowloaded}/{this.state.totalSize} MB dowloaded at {this.state.dlSpeed} Mb/sec {this.state.remaining} seconds remaining</h4>}
                <MDBRow center id="videoContainer" className="mt-5 pt-5">
                    <MDBCol size="8">
                    {<video id="basePlayer" controls/>}
                    </MDBCol>
                    <MDBCol size="4">
                        {<MovieInfo/>}
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    {this.state.allFiles.length > 0 && <h4 className="text-center">Files Downloaded</h4>}
                    <MDBCol size="12">
                            <FileList files={this.state.allFiles} />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}

Viewer.propTypes = {
    magnet: PropTypes.string
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