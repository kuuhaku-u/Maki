import React from 'react';
import axios from 'axios';
export class Cam extends React.Component {
  state = {
    isSupported: true,
    isPhoto: false,
    pass: '',
  };
  componentDidMount() {
    const mediaDevices =
      navigator.mediaDevices || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    if (!mediaDevices || !mediaDevices.getUserMedia) {
      this.setState({ isSupported: false });
      return;
    }
    mediaDevices.getUserMedia({ video: true }).then(this.handleVideo).catch(this.videoError);
  }
  handleVideo = (stream) => {
    this.videoElement.srcObject = stream;
    this.videoElement.play();
  };
  videoError = (err) => {
    //...
  };
  Video = () => (
    <React.Fragment>
      <video
        id='video'
        width='320'
        height='240'
        className='cameraFrame'
        ref={(input) => {
          this.videoElement = input;
        }}
      />
      <button onClick={this.handleCapture}>capture photo</button>
    </React.Fragment>
  );
  Canvas = () => (
    <React.Fragment>
      <canvas
        id='canvas'
        width='320'
        height='240'
        className='photoCard'
        ref={(canvas) => (this.canvasElement = canvas)}
      />
      {this.state.isPhoto && (
        <React.Fragment>
          <a
            href='#'
            download='captured.png'
            ref={(btn) => {
              this.btn = btn;
            }}></a>
        </React.Fragment>
      )}
    </React.Fragment>
  );
  handleCapture = () => {
    if (this.canvasElement && this.videoElement) {
      const context = this.canvasElement.getContext('2d');
      context.drawImage(this.videoElement, 0, 0, 320, 240);
      this.canvasElement.toBlob((blob) => {
        this.setState({ isPhoto: true }, () => {
          this.uploadImage(blob);
        });
      }, 'image/png');
    }
  };
  uploadImage = (blob) => {
    const formData = new FormData();
    formData.append('image', blob, 'captured.png');
    formData.append('pass', this.state.pass);
    axios.post('http://localhost:8000/image', formData).then(
      () => alert('uploaded'),
      () => alert('noop'),
    );
  };
  render() {
    return (
      <div>
        {this.state.isSupported ? (
          <React.Fragment>
            {this.Video()}
            {this.Canvas()}
          </React.Fragment>
        ) : (
          'not supported'
        )}
      </div>
    );
  }
}

