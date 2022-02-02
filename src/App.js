import React from 'react'
import videojs from 'video.js'
import awsvideoconfig from './aws-video-exports'
import './App.css'
import 'video.js/dist/video-js.css'
import Amplify from 'aws-amplify'
import {
  AmplifyAuthenticator,
  AmplifySignOut,
  AmplifySignIn,
  AmplifySignUp,
} from '@aws-amplify/ui-react'
import awsConfig from './aws-exports'
Amplify.configure(awsConfig);

class VideoPlayer extends React.Component {
  componentDidMount() {
    this.player = videojs(this.videoNode, this.props)
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  render() {
    return (

      <AmplifyAuthenticator>
      <AmplifySignIn
        headerText='AnyCompany video team, Sign-In with Your E-Mail Address'
        slot='sign-in'
      />
      <AmplifySignUp
        headerText='AnyCompany video team, Sign-Up with Your E-Mail Address'
        slot='sign-up'
      />
      <div data-vjs-player style={{
          width: 960, height: 540
        }}>
        <video  ref={(node) => { this.videoNode = node; }} className="video-js" />
      </div>

      <div className='sign-out'>
        <AmplifySignOut />
      </div>
    </AmplifyAuthenticator>

    );
  }
}

const videoJsOptions = {
  autoplay: true,
  controls: true,
  sources: [{
    src: awsvideoconfig.awsOutputLiveLL,
  }]
}

function App() {
  return (
    <div>
      <nav style={nav}>
        <p style={navHeading}>Live Streaming with React & AWS</p>
      </nav>
      <div style={container}>
        <VideoPlayer { ...videoJsOptions } />
      </div>
    </div>
  );
}

const nav = { padding: '0px 40px', height: 60, borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center' }
const container = { paddingTop: 40, width: 960, margin: '0 auto' }
const navHeading = { margin: 0, fontSize: 18 }

export default App