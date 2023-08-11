import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Container,
  useTheme,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loader/Loading";
import { useDispatch } from "react-redux";
import { verifyUpdateNewEmail } from "../../ReduxToolKit/userSlice";

const VerificationForm = () => {
  const { userId } = useParams();
  // console.log("userID-----", userId);

  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // _______________Loading State________________
  const [loading, setLoading] = useState(false);

  const [verificationCode, setVerificationCode] = useState();

  //disiblke button
  const isButtonDisabled = verificationCode?.length !== 6;

  const handleChange = (event) => {
    const inputCode = event.target.value.replace(/\D/g, ""); // Allow only digits
    if (inputCode.length <= 6) {
      setVerificationCode(inputCode);
    }
  };

  const handleVerify = async () => {
    // console.log("Verification Code:", verificationCode);
    const data = {
      verificationCode: verificationCode,
      userId: userId,
    };
    // console.log("data", data);
    setLoading(true);

    try {
      const response = await dispatch(verifyUpdateNewEmail(data));
      // console.log("response---", response);

      if (response.payload) {
        localStorage.removeItem("authToken");

        navigate("/login");
      }
    } catch (error) {
      // Handle any error that occurred during the dispatch or API call
      console.error("Error in handleVerify:", error);
    }

    setLoading(false);
  };

  return (
    <>
      <Loading isLoading={loading} />
      <Container
        sx={{
          // border: "1px solid red",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            boxShadow: theme.palette.background.boxShadow,
            // width: { md: "100%", sm: "100%", xs: "100%" },
            maxWidth: "md",
            py: { md: 8, sm: 6, xs: 4 },
            px: { md: 6, sm: 4, xs: 2 },
            // border: "1px solid red",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              flexDirection: "column",
              //   border: "1px solid red",
              p: 2,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                textAlign: "center",
              }}
            >
              Email Verify
            </Typography>
            <TextField
              type="text"
              inputProps={{
                maxLength: 6,
              }}
              value={verificationCode}
              onChange={handleChange}
              placeholder="Enter Verification Code"
            />
            <Button
              onClick={handleVerify}
              disabled={isButtonDisabled}
              variant="contained"
              color="primary"
            >
              Verify
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default VerificationForm;
