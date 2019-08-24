import React from 'react'
import actions from '../store/actions'
import { connect } from 'react-redux';
import { MDBContainer, MDBRow, MDBInput, MDBCol, MDBBtn } from 'mdbreact';
class Home extends React.Component {
    state = {
        magnet:""
    }
    render() {
        return(
            <MDBContainer>
                <h2 className="text-center">TorrVision</h2>
                <MDBRow center className="mt-5 pt-5">
                    <MDBCol md="8">
                        <MDBInput getValue={(value) => this.setState({magnet:value})} label="Magnet or Info Hash here" />
                    </MDBCol>
                    <MDBCol md="4">
                        <MDBBtn color="primary" onClick={() => {
                            this.props.updateMagnet(this.state.magnet)
                            this.props.history.push("/view")
                        }}>View That</MDBBtn>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        updateMagnet: magnet => {dispatch(actions.changeMagnet(magnet))}
    }
}

export default connect(null, mapDispatchToProps)(Home)