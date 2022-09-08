import React, { useEffect, useState } from "react";
import { Alert, Card, Container, Spinner } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { Footer } from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";
import { eamilVerifyAdminUser } from "../../helpers/axiosHelper";

// grab the c and e from the query string parameters
// create an axios fucntion to call the server

// create api enpoint to receive this code
// check if the commbination of the email and code exist in the user tale, if so activate the user and send email notification

const EmailVerification = () => {
  const [queryParams] = useSearchParams();
  const [isPending, setIsPending] = useState(true);
  const [response, setRespose] = useState({});

  useEffect(() => {
    let ignore = false;
    const obj = {
      emailValidationCode: queryParams.get("c"),
      email: queryParams.get("e"),
    };
    // call axios to call the server

    // (async () => {
    //   if (!ignore) {
    //     const result = await eamilVerifyAdminUser(obj);
    //     setRespose(result);
    //     setIsPending(false);
    //   }
    // })();

    eamilVerifyAdminUser(obj).then((result) => {
      if (!ignore) {
        setRespose(result);
        setIsPending(false);
      }
    });

    return () => {
      ignore = true;
    };
  }, [queryParams]);

  console.log(response);
  return (
    <div>
      <Header />

      <Container className="page-main">
        {isPending && (
          <Card className="mt-5 p-2 m-auto" style={{ width: "20rem" }}>
            <Spinner
              variant="primary"
              animation="border"
              className="m-auto mb-4"
            />

            <h5>Eamil verification process has began. please wait ....</h5>
          </Card>
        )}
        {response.message && (
          <Alert
            variant={response.status === "success" ? "success" : "danger"}
            className="mt-5 p-2 m-auto"
          >
            {response.message}
          </Alert>
        )}
      </Container>

      <Footer />
    </div>
  );
};

export default EmailVerification;
