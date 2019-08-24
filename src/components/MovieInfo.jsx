import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import actions from '../store/actions'
import search from '../movieApi'
import { MDBInput, MDBBtn, MDBRow, MDBCol } from 'mdbreact';

const MovieInfo = ({title, updatePoster, updateTitle}) => {
    const [overview, setOverview] = useState("")
    const [newTitle, setNewTitle] = useState("")
    const [poster, setPoster] = useState("")
    const [manualInsert, setManualInsert] = useState(false)

    // destructure props in order to use it with useEffect()
    // update title and search results
    useEffect(() => {
        // reinitialize overview and poster to fetch new ones
        setOverview("")
        setPoster("")
        if (title !== "") {
            search.movie(title).then(res => {
                if (res.data.total_results > 0) {
                    setManualInsert(false)
                    setOverview(res.data.results[0].overview)
                    setPoster(`https://image.tmdb.org/t/p/w500${res.data.results[0].poster_path}`)
                    updatePoster(`https://image.tmdb.org/t/p/w500${res.data.results[0].backdrop_path}`)
                } else {
                    setManualInsert(true)
                }
            })
        }
    }, [title]) // only update if the title has changed
    // if user needs to manually insert title
    if (manualInsert) {
        return (
            <div>
                <p>Our monkeys could not understand the movie's title. Please enter it below</p>
                <MDBInput getValue={(title) => setNewTitle(title)} label="Insert title here" />
                <MDBBtn color="secondary" onClick={() => {
                    updateTitle(newTitle) // dispatch action to store to update movie title
                }}>Validate</MDBBtn>
        </div>
        )
    } else /* if tmdb got at least one movie back, let's render the info we have on it */  {
        return (
            <div className="z-depth-3">
                <MDBRow>
                    <MDBCol size="6">
                        <img src={poster} className="img-fluid" alt={title} />
                    </MDBCol>
                    <MDBCol size="6">
                        <p>{overview}</p>
                    </MDBCol>
                </MDBRow>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        title:state.title,
        poster:state.poster
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updatePoster: poster => dispatch(actions.changePoster(poster)),
        updateTitle: title => dispatch(actions.changeTitle(title))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MovieInfo)