import { useContext, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Alert, Box, Button, Input, Stack } from "@mui/material";
import PredictionContext from "../store";
import InsertLinkIcon from "@mui/icons-material/InsertLink";

const SearchBox = () => {
  const [input, setInput] = useState("");
  const [link, setLink] = useState(false);
  const { preds, setPreds } = useContext(PredictionContext);

  const predict = async () => {
    try {
      if (!input) {
        toast("Enter some text to predict");
        setInput("");
        return;
      }
      const apiLink = !link
        ? "http://localhost:5001/predict"
        : "http://localhost:5001/predict/link";
      console.log("posted");
      const { data: prediction } = await axios.post(apiLink, {
        text: input,
      });

      toast(prediction);

      const newPreds = [...preds];

      if (link) {
        const { heading, ans } = prediction;
        newPreds.unshift({ input: heading, prediction: ans });
      } else {
        newPreds.unshift({ input, prediction });
      }
      setPreds(newPreds);
      setInput("");
      console.log(preds);
    } catch (err) {
      link ? toast("Not a Valid Link") : toast("Oops seems to be an error");
      console.error(err);
    }
  };

  return (
    <Stack direction={"column"} alignItems={"center"} justifyContent={"center"}>
      <Box display={"flex"} alignItems={"center"}>
        <Input
          size="small"
          width="10px"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <InsertLinkIcon
          color={link ? "success" : "secondary"}
          onClick={() => setLink(!link)}
        />
      </Box>
      <Button onClick={predict}>Predict the Sentiment</Button>
      <ToastContainer />
    </Stack>
  );
};

export default SearchBox;
