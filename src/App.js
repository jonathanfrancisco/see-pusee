import React from 'react';
import ml5 from 'ml5';
import './App.css';
import Camera, {FACING_MODES} from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

class App extends React.Component {

  state = {
    imageTaken: '',
    isPussyText: '', 
    classifier: null,
    loading: false
  };

  componentDidMount() {
    this.setState({classifier: ml5.imageClassifier('MobileNet', () => {
      console.log('MODEL LOADED!');
    })});
  }

  handleTakePhoto = (dataUri) => {

    this.setState({imageTaken: dataUri, loading: true}, () => {

      this.state.classifier.classify(document.getElementById('imageTaken'), (err, results) => {
        const concatenatedLabels = results[0].label+results[1].label+results[2].label;
        const isCat = concatenatedLabels.includes('cat');
        console.log(results);
        console.log(concatenatedLabels);
        console.log('isCat: ', isCat);
        if(isCat)
          this.setState({isPussyText: '😋 PUSSY 😋', loading: false});
        else
          this.setState({isPussyText: '😩 NOT PUSSY 😩', loading: false});
      });

    });

  };

  handleCamshotAgain = () => {
    this.setState({
      imageTaken: '',
      isPussyText: ''
    });
  }

  render() {
    console.log(this.state);
    return (
        <div className="App">
          {
            this.state.imageTaken === '' ? (
              <Camera onTakePhoto={(dataUri) => this.handleTakePhoto(dataUri)} isFullscreen={true} isImageMirror={false} idealFacingMode={FACING_MODES.ENVIRONMENT} />
            )  : (
              <div style={{padding: 19}}>
                <Paper style={{padding: 12}} >
                  <img style={{width: '100%', marginTop: 8}} src={this.state.imageTaken} alt="pussified" id="imageTaken"/>
                </Paper>
                <Typography style={{marginTop: 12}} variant="h4">{this.state.isPussyText}</Typography>
                <Button onClick={this.handleCamshotAgain} style={{textAlign: 'center', backgroundColor: '#8e44ad', marginTop: 12}} variant="contained" color="secondary">
                  <Icon>autorenew</Icon> Camshot a pussy again.
                </Button>
              </div>
            )
          }
        </div>
    );
  }
}

export default App;
