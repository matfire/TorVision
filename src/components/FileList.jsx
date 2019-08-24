import React from 'react'
import { MDBBtn, MDBListGroup, MDBListGroupItem} from 'mdbreact';


class FileList extends React.Component {
    render() {
        return(
            <div>
                <MDBListGroup>
                    {this.props.files.map((file) => (
                        <MDBListGroupItem key={file.length}>{file.name} <MDBBtn target="_blank" download={file.name} tag="a" href={file.url}>Download</MDBBtn></MDBListGroupItem>
                    ))}
                </MDBListGroup>
            </div>
        )
    }
}

export default FileList