import React, {useState} from 'react'
import actions from '../store/actions'
import { connect } from 'react-redux';
import { MDBContainer, MDBRow, MDBInput, MDBCol, MDBBtn, MDBAlert } from 'mdbreact';


const Home = ({updateMagnet, history}) => {
    const [magnet, changeMagnet] = useState("")
    const [alert, updateAlert] = useState(false)
    return (
        <MDBContainer>
        <h2 className="text-center">TorrVision</h2>
        {alert && <MDBAlert color="danger">Please provide a magnet link or info hash</MDBAlert>}
        <MDBRow center className="mt-5 pt-5">
            <MDBCol md="8">
                <MDBInput getValue={(value) => changeMagnet(value)} label="Magnet or Info Hash here" />
            </MDBCol>
            <MDBCol md="4">
                <MDBBtn color="primary" onClick={() => {
                    if (magnet === "") {
                        updateAlert(true)
                    } else {
                        updateAlert(false)
                        updateMagnet(magnet)
                        history.push("/view")
                    }
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