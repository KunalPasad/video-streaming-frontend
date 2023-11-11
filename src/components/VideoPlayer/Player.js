import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
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

function ValueLabelComponent(props) {
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
    const [showControls, setShowControls] = React.useState(false);

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
    };

    const videoStyle = {
        width: "100%",
        maxWidth: "100%",
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

    return (
        <React.Fragment>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6">React Video Player</Typography>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Container maxWidth="md">
                <div
                    style={playerWrapperStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <ReactPlayer
                        ref={playerRef}
                        style={videoStyle}
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
                                        ValueLabelComponent={ValueLabelComponent}
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
            </Container>
        </React.Fragment>
    );
}

export default Test;
