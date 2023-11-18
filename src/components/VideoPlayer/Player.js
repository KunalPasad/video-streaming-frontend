import * as React from "react";
import { Button, Container, Slider, Tooltip, Typography } from "@mui/material";
import ReactPlayer from "react-player";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import Popover from "@mui/material/Popover";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import '../Video/RecommendedVideos.css'
import VideoCard from '../Video/VideoCard';
import { useState, useEffect } from "react";
import axios from "axios";


const baseURL = 'http://early-pugs-stand.loca.lt/api/v1';
var internalFileId = 'XXCo0UHlBvGWlMFXRzV6t5UxHpYFH2kA';


function valuelabelcomponent(props) {
    const { children, open, value } = props;




    return (
        <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
            {children}
        </Tooltip>
    );
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

function Test() {
    const playerRef = React.useRef(null);

    const [playbackRate, setPlaybackRate] = React.useState(1);
    const [isPlaying, setIsPlaying] = React.useState(true);
    const [volume, setVolume] = React.useState(1);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showControls, setShowControls] = React.useState(true);

    const handleMouseEnter = () => {
        setShowControls(true);
    };

    const handleMouseLeave = () => {
        setShowControls(false);
    };

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleFastForward = () => {
        const newTime = currentTime + 10;
        playerRef.current.seekTo(newTime);
    };

    const handleFastRewind = () => {
        const newTime = currentTime - 10;
        playerRef.current.seekTo(newTime);
    };

    const handleVolumeChange = (event, newValue) => {
        setVolume(newValue);
    };

    const handleSliderChange = (event, newValue) => {
        setCurrentTime(newValue);
    };

    const handleSliderSeek = (event, newValue) => {
        playerRef.current.seekTo(newValue);
    };

    const handleFullscreenToggle = () => {
        const player = playerRef.current.getInternalPlayer();
        if (player) {
            if (!document.fullscreenElement) {
                player.requestFullscreen().catch((err) => {
                    console.error("Fullscreen request failed:", err);
                });
            } else {
                document.exitFullscreen();
            }
        }
    };

    const handlePopover = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "playbackrate-popover" : undefined;

    const handleChangePlaybackRate = (rate) => {
        setPlaybackRate(rate);
    };

    const playerWrapperStyle = {
        width: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "50vh",
        paddingBottom: "56.25%",
    };

    const videoStyle = {
        width: "100%",
        maxWidth: "100%",
        height: "55",
    };

    const controlIconsStyle = {
        color: "#777",
        fontSize: 50,
        transform: "scale(0.9)",
    };

    const controlWrapperStyle = {
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        zIndex: 1,
    };

    const bottomIconsStyle = {
        color: "#999",
    };

    const volumeSliderStyle = {
        width: 100,
    };

    const [likesCount, setLikesCount] = React.useState(0);


    const handleLikeClick = () => {
        setLikesCount(likesCount + 1);
    };

    const [details, setDetails] = useState({});


    
    
    useEffect(() => {
        async function getInfo() {
            try {
                const response = await axios.get(`${baseURL}/video/details/${internalFileId}`);
                setDetails(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getInfo();
    }, []);
    return (
        <React.Fragment>
            {/* <AppBar position="fixed">
                    <Toolbar>
                        <Typography variant="h6">React Video Player</Typography>
                    </Toolbar>
                </AppBar>
                <Toolbar /> */}
            <Container maxWidth="md">
                <div
                    style={playerWrapperStyle}

                >
                    <ReactPlayer
                        ref={playerRef}
                        // style={videoStyle}
                        style={{ width: "100%", height: "100%" }}
                        url="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
                        muted={false}
                        playing={isPlaying}
                        volume={volume}
                        playbackRate={playbackRate}
                        onProgress={(e) => setCurrentTime(e.playedSeconds)}
                        onDuration={(e) => setDuration(e)}
                    />
                    {showControls && (
                        <div style={controlWrapperStyle}>
                            <Grid
                                container
                                direction="row"
                                alignItems="center"
                                justify="space-between"
                                style={{ padding: 16 }}
                            >
                                <Grid item>
                                    <Typography variant="h5" style={{ color: "#fff" }}>
                                        Custom Player Title
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                direction="row"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <IconButton
                                    style={{
                                        ...controlIconsStyle,
                                        marginLeft: 16,
                                    }}
                                    aria-label="rewind"
                                    onClick={handleFastRewind}
                                >
                                    <FastRewindIcon fontSize="inherit" />
                                </IconButton>

                                <IconButton
                                    style={controlIconsStyle}
                                    aria-label="play"
                                    onClick={handlePlayPause}
                                >
                                    {isPlaying ? (
                                        <PauseIcon fontSize="inherit" />
                                    ) : (
                                        <PlayArrowIcon fontSize="inherit" />
                                    )}
                                </IconButton>

                                <IconButton
                                    style={{
                                        ...controlIconsStyle,
                                        marginRight: 16,
                                    }}
                                    aria-label="fast forward"
                                    onClick={handleFastForward}
                                >
                                    <FastForwardIcon fontSize="inherit" />
                                </IconButton>
                            </Grid>

                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                style={{ padding: 16 }}
                            >
                                <Grid item xs={12}>
                                    <Slider
                                        min={0}
                                        max={duration}
                                        value={currentTime}
                                        onChange={handleSliderChange}
                                        onChangeCommitted={handleSliderSeek}
                                        ValueLabelComponent={valuelabelcomponent}
                                        valueLabelFormat={(value) => formatTime(value)}
                                    />
                                </Grid>

                                <Grid item>
                                    <Grid container alignItems="center" direction="row">
                                        <IconButton
                                            style={bottomIconsStyle}
                                            onClick={handlePlayPause}
                                        >
                                            {isPlaying ? (
                                                <PauseIcon fontSize="large" />
                                            ) : (
                                                <PlayArrowIcon fontSize="large" />
                                            )}
                                        </IconButton>

                                        <IconButton style={bottomIconsStyle}>
                                            <VolumeUpIcon fontSize="large" />
                                        </IconButton>

                                        <Slider
                                            min={0}
                                            max={1}
                                            step={0.01}
                                            value={volume}
                                            onChange={handleVolumeChange}
                                            style={volumeSliderStyle}
                                        />
                                        <Button
                                            variant="text"
                                            style={{ color: "#fff", marginLeft: 16 }}
                                        >
                                            <Typography>
                                                {formatTime(currentTime)} / {formatTime(duration)}
                                            </Typography>
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Button
                                        onClick={handlePopover}
                                        variant="text"
                                        style={bottomIconsStyle}
                                    >
                                        <Typography>{playbackRate}X</Typography>
                                    </Button>
                                    <Popover
                                        id={id}
                                        open={open}
                                        anchorEl={anchorEl}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "center",
                                        }}
                                        transformOrigin={{
                                            vertical: "bottom",
                                            horizontal: "center",
                                        }}
                                    >
                                        <Grid container direction="column-reverse">
                                            {[0.5, 1, 1.5, 2].map((rate) => (
                                                <Button
                                                    key={rate}
                                                    variant="text"
                                                    onClick={() => handleChangePlaybackRate(rate)}
                                                >
                                                    <Typography color="secondary">{rate}X</Typography>
                                                </Button>
                                            ))}
                                        </Grid>
                                    </Popover>
                                    <IconButton
                                        style={bottomIconsStyle}
                                        onClick={handleFullscreenToggle}
                                    >
                                        <FullscreenIcon fontSize="large" />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </div>
                    )}
                </div>

                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
                        <Grid item>
                            <Typography variant="h4">{details['title']}</Typography>
                        </Grid>
                        <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton variant="contained" color="primary" onClick={handleLikeClick}>
                                <ThumbUpIcon />
                            </IconButton>
                            <Typography variant="h6" style={{ marginLeft: '8px' }}>
                                {likesCount}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1">{details['viewCounter']}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        {details['desc']}
                    </Typography>
                </Grid>


            </Container>
            <div className='recommendedVideos'>
                <h2>
                    Recommended Videos
                </h2>
                <div className="recommendedVideos_videos">
                    <VideoCard
                        title="Machine Learning Full Course"
                        views="2M views"
                        timestamp="2 days ago"
                        channelImage="https://yt3.googleusercontent.com/7q9t5rjeujEZYqY1xMLn0mvT4Zc6MaZBYgtseDL2_Zh42AOhMze8ep7BUKdR5FnxytMy3csj=s176-c-k-c0x00ffffff-no-rj"
                        channel="Simplilearn"
                        image="https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-980x653.jpg"
                    />
                    <VideoCard
                        title="Machine Learning Full Course"
                        views="2M views"
                        timestamp="2 days ago"
                        channelImage="https://yt3.googleusercontent.com/7q9t5rjeujEZYqY1xMLn0mvT4Zc6MaZBYgtseDL2_Zh42AOhMze8ep7BUKdR5FnxytMy3csj=s176-c-k-c0x00ffffff-no-rj"
                        channel="Simplilearn"
                        image="https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-980x653.jpg"
                    />
                    <VideoCard
                        title="Machine Learning Full Course"
                        views="2M views"
                        timestamp="2 days ago"
                        channelImage="https://yt3.googleusercontent.com/7q9t5rjeujEZYqY1xMLn0mvT4Zc6MaZBYgtseDL2_Zh42AOhMze8ep7BUKdR5FnxytMy3csj=s176-c-k-c0x00ffffff-no-rj"
                        channel="Simplilearn"
                        image="https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-980x653.jpg"
                    />
                    <VideoCard
                        title="Machine Learning Full Course"
                        views="2M views"
                        timestamp="2 days ago"
                        channelImage="https://yt3.googleusercontent.com/7q9t5rjeujEZYqY1xMLn0mvT4Zc6MaZBYgtseDL2_Zh42AOhMze8ep7BUKdR5FnxytMy3csj=s176-c-k-c0x00ffffff-no-rj"
                        channel="Simplilearn"
                        image="https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-980x653.jpg"
                    />

                </div>
            </div>
        </React.Fragment>
    );
}

export default Test;
