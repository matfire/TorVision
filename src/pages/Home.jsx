import React, {useState} from 'react'
import actions from '../store/actions'
import { connect } from 'react-redux';
import { MDBContainer, MDBRow, MDBInput, MDBCol, MDBBtn } from 'mdbreact';


const Home = ({updateMagnet, history}) => {
    const [magnet, changeMagnet] = useState("")
    return (
        <MDBContainer>
        <h2 className="text-center">TorrVision</h2>
        <MDBRow center className="mt-5 pt-5">
            <MDBCol md="8">
                <MDBInput getValue={(value) => changeMagnet(value)} label="Magnet or Info Hash here" />
            </MDBCol>
            <MDBCol md="4">
                <MDBBtn color="primary" onClick={() => {
                    updateMagnet(magnet)
                    history.push("/view")
                }}>View That</MDBBtn>
            </MDBCol>
        </MDBRow>
    </MDBContainer>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        updateMagnet: magnet => {dispatch(actions.changeMagnet(magnet))}
    }
}

export default connect(null, mapDispatchToProps)(Home)