import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css'; // for bootstrap to work

// importing components
import BackgroundVideo from "./components/BackgroundVideo";
import ProfilePageSlider from "./components/profile-pageslider/ProfilePageSlider";

// importing assets
import netBgImage from "./assets/videos/net_bg.mp4";

const Wrapper = styled.main`
  width: 100vw;
  height: 100vh;
  color: white;
  position: relative;
`

function App() {

  return (
    <Wrapper>
      <BackgroundVideo source={netBgImage}/>
      <ProfilePageSlider/>
    </Wrapper>
  )
}

export default App
