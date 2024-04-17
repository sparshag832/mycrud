"use client";
import { Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Card from "@mui/material/Card";
import { CardActions } from "@mui/material";

function isLowerCase(input) {
  return input === String(input).toLowerCase();
}

function page() {
  let isValid = false;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [num, setNumber] = useState("");
  const [data, setData] = useState([]);

  let re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const regexp = new RegExp(`^-?[0-9]*$`);

  if (name.length >= 3 && num.length == 10 && re.test(email)) {
    isValid = true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
    console.log(email);
    console.log(num);
    pushData(name, email, num);
  };

  const handleDelete = (index) => {
    setData(data.filter((item, i) => i !== index));
  };

 
  const handleUpdate = (index) => {
    setName(data[index].name);
    setEmail(data[index].email);
    setNumber(data[index].num);
    setData([
     ...data.slice(0, index),
      {
        name: name,
        email: email,
        num: num,
      },
      ...data.slice(index+1),
    ]);
  };


  const pushData = (name, email, num) => {
    setData([
      ...data,
      {
        name: name,
        email: email,
        num: num,
      },
    ]);
  };

  console.log(data);

  return (
    <>
      <center className="flex gap-10 justify-around">
        <div>
          <TextField
            id="tfName"
            label="Name"
            variant="outlined"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          {name.length < 3 ? <p>Enter Valid Name</p> : null}
        </div>

        <div>
          <TextField
            id="tfEmail"
            label="Enter Email"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {!re.test(email) ? <p>Enter Valid Email Address</p> : null}
        </div>

        <div>
          <TextField
            id="tfPno"
            label="Enter Phone No."
            variant="outlined"
            type="tel"
            pattern="[0-9]"
            onChange={(event) => {
              const newValue = event.target.value;
              if (regexp.test(newValue)) {
                setNumber(newValue);
              }
            }}
          />
          {!(num.length == 10) ? <p>Enter Valid Phone Number</p> : null}
        </div>
      </center>
      <center className="mt-5">
        <Button
          variant="contained"
          type="button"
          disabled={!isValid}
          onClick={handleSubmit}
        >
          {" "}
          Click Me{" "}
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
                    onClick={() => {
                      handleUpdate(index);
                    }}
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
