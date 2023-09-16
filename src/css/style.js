import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({

    leftFirst:{
        fontSize:"15px",
        fontWeight:500
    },

    search: {
        display: "flex",
        maxWidth: "600px",
        gap: "20px",
        alignItems: "center",
        margin: "auto",
        '@media (max-width:750px)': {
            flexDirection: "column"
        }
    },
    searchCon: {
        background: "whitesmoke",
        padding: "20px"
    },
    inputResult: {
        width: "100%",
        position: 'relative'
    },
    result: {
        position: "absolute",
        background: "white",
        width: "100%",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        zIndex: "100",
        borderRadius: "5px",
        boxShadow: "0px 0px 1px gray"
    },
    smallBook: {
        display: "flex",
        justifyContent: "space-between",
        padding: "5px",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "all .3s",
        "&:hover": {
            background: "#e1dede",
        }
    },
    oneside: {
        display: "flex",
        flexDirection: "column"
    },
    title: {

    },
    desc: {
        color: "gray",
        fontSize: "14px"
    },
    cart: {
        color: '#54b0af'
    },
    clear: {
        alignSelf: "flex-end",
        cursor:"pointer"
    }

})

export default useStyles