export default function ImageDisplay(props) {
    return (
        <div>
            <img src={"data:image/png;base64,"+btoa(encodeURIComponent(props.data))} alt="Random Generated Image" />
        </div>
    )
}
