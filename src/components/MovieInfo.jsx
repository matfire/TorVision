import React from 'react'
import propTypes from 'prop-types'
import {connect} from 'react-redux'
import actions from '../store/actions'
import search from '../movieApi'
import * as is_video from 'is-video'
import { MDBInput, MDBBtn, MDBRow, MDBCol } from 'mdbreact';

class MovieInfo extends React.Component {
    componentDidMount() {
        if (this.props.title) {
            search.movie(this.props.title).then(res => {
                if (res.data.total_results > 0) {
                    this.setState({
                        overview:res.data.results[0].overview,
                        rating:res.data.results[0].vote_average,
                        poster:`https://image.tmdb.org/t/p/w500${res.data.results[0].poster_path}`
                    })
                    this.props.updatePoster(`https://image.tmdb.org/t/p/w500${res.data.results[0].backdrop_path}`)
                } else {
                    this.setState({
                        manualInsert:true
                    })
                }
            })
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.title !== this.props.title && this.props.title !== "") {
            this.setState({overview:"", rating:0,poster:""})
            search.movie(this.props.title).then(res => {
                if (res.data.total_results > 0) {
                    this.setState({
                        overview:res.data.results[0].overview,
                        rating:res.data.results[0].vote_average,
                        poster:`https://image.tmdb.org/t/p/w500${res.data.results[0].poster_path}`
                    })
                    this.props.updatePoster(`https://image.tmdb.org/t/p/w500${res.data.results[0].backdrop_path}`)
                } else {
                    this.setState({
                        manualInsert:true
                    })
                }
            })
        }
    }
    state = {
        overview:"",
        rating:0,
        manualInsert:false,
        title:"",
        poster:""
    }
    render() {
        if (this.state.manualInsert) {
            return(
                <div>
                    <p>Our monkeys could not understand the movie's title. Please enter it below</p>
                    <MDBInput getValue={(title) => this.setState({title})} label="Insert title here" />
                    <MDBBtn color="secondary" onClick={() => {
                        this.setState({manualInsert:false})
                        this.props.updateTitle(this.state.title)
                    }}>Validate</MDBBtn>
                </div>
            )
        }
        return (
            <div className="z-depth-3">
                <MDBRow>
                    <MDBCol size="6">
                        <img src={this.state.poster} className="img-fluid" alt={this.props.title} />
                    </MDBCol>
                    <MDBCol size="6">
                        <p>{this.state.overview}</p>
                    </MDBCol>
                </MDBRow>
            </div>
        )
    }
}

MovieInfo.propTypes = {
    title: propTypes.string
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