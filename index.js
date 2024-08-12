import express, { json, response } from "express";
const app = express();
const port = 3000;
app.use(express.json()); // middleware
app.post("/prueba", (req, res) => {
  const body = req.body;
  res.json(
    body.products.filter((value) => {
      return value.price > 500;
    })
  );
});
// tarea
// ejercio
app.post("/capitalize", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  if (!firstName || !lastName) {
    return res.status(400).json({ error: "ERROR " });
  }
  const capitalizedFirstName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1);
  const capitalizedLastName =
    lastName.charAt(0).toUpperCase() + lastName.slice(1);

  res.json({ fullName: `${capitalizedFirstName} ${capitalizedLastName}` });
});
// ejercicio 2
app.post("/age", (req, res) => {
  const age = req.body.age;
  const name = req.body.name;
  if (age >= 18) {
    res.json({ message: `${name} es mayor de edad.` });
  } else {
    res.json({ message: `${name} es menor de edad.` });
  }
});
// ejercicio 3
app.post("/convert", (req, res) => {
  const tasaConversion = req.body;
  const monto = req.body;
  const montoNuevo = monto * tasaConversion;
  res.json({ montoNuevo: montoNuevo.toFixed(2) });
});

// ejercicio 4
app.post("/date", (req, res) => {
  const isoDate = req.body.isoDate;
  const date = new Date(isoDate);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  const forDate = `${day}-${month}-${year}`;
  res.json({ forDate });
});

// ejercicio 5
app.post("/validate-email", (req, res) => {
  const email = req.body.email;
  const partes = email.split("@");
  if (partes.length === 2) {
    res.json({ message: "El correo electrónico es válido." });
  } else {
    res.json({ message: "El correo electrónico no es válido." });
  }
});

app.listen(port, () => {
  console.log("el server esta corriendo en el puerto " + port);
});
