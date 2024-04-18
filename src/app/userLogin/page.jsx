"use client";
import { Button, Grid, Modal } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Card from "@mui/material/Card";
import { CardActions } from "@mui/material";

function createid() {
  return Date.now()
}

function page() {
  let isValid = false;
  let isvalidUp = false;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [num, setNumber] = useState("");
  const [uid, setuid] = useState(createid());
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [isindex, setindex] = useState(null);
  let re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const regexp = new RegExp(`^-?[0-9]*$`);

  if (name.length >= 3 && num.length == 10 && re.test(email)) {
    isValid = true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setuid(createid());
    console.log(uid);
    if (update) {
      setEmail("");
      setName("");
      setNumber("");

      setData([
        ...data.slice(0, isindex),
        {
          name: name,
          email: email,
          num: num,
          uid:data[isindex].uid
        },
        ...data.slice(isindex + 1),
      ]);
    } else {
      pushData(name, email, num, uid);
      setEmail("");
      setName("");
      setNumber("");
      isValid = false;
    }
    setUpdate(false);
  };

  const handleDelete = (index) => {
    setData(data.filter((item, i) => i !== index));
  };

  const handleUpdate = (index) => {
    setindex(index);
    setUpdate(true);
    setName(data[index].name);
    setEmail(data[index].email);
    setNumber(data[index].num);
  };

  const pushData = (name, email, num, uid) => {
    setData([
      ...data,
      {
        name: name,
        email: email,
        num: num,
        uid: uid,
      },
    ]);
  };

  console.log(data);
  // console.log(isindex);
  // console.log(update)

  return (
    <>
      <card variant="outlineds">
        <center>
          <div className="mt-5">
            <TextField
              id="tfName"
              label="Name"
              variant="outlined"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            {name.length < 3 ? <p className="error">Enter Valid Name</p> : null}
          </div>

          <div className="mt-5">
            <TextField
              id="tfEmail"
              label="Enter Email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {!re.test(email) ? (
              <p className="error">Enter Valid Email Address</p>
            ) : null}
          </div>

          <div className="mt-5">
            <TextField
              id="tfPno"
              label="Enter Phone No."
              variant="outlined"
              type="tel"
              pattern="[0-9]"
              value={num}
              onChange={(event) => {
                const newValue = event.target.value;
                if (regexp.test(newValue)) {
                  setNumber(newValue);
                }
              }}
            />
            {!(num.length == 10) ? (
              <p className="error"> Enter Valid Phone Number</p>
            ) : null}
          </div>
        </center>
      </card>
      <center className="mt-5">
        <Button
          variant="contained"
          type="button"
          disabled={!isValid}
          onClick={handleSubmit}
        >
          {" "}
          Save{" "}
        </Button>
      </center>
      <div className=" mt-10">
        <center>
          <Grid container gap={2}>
            {data.map((item, index) => (
              <Grid item lg={2} md={3} key={index}>
                <Card sx={{ width: 200 }} variant="outlined">
                  <h1>{item.name}</h1>
                  <h1>{item.email}</h1>
                  <h1>{item.num}</h1>
                  <CardActions>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        handleDelete(index);
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={()=>{handleUpdate(index)}}
                    >
                      Update
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </center>
      </div>
    </>
  );
}

export default page;
