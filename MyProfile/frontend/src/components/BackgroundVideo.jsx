import styled from "styled-components"

const BackgroundVideoWrapper = styled.video`
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    object-fit: cover;
    z-index: -1;
`

export default function BackgroundVideo(props){
    return <BackgroundVideoWrapper src={props.source} autoPlay muted loop/>
}