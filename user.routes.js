import express from "express";
const router = express.Router();
let userList = [
  {
    id: 1,
    firstName: "Dinesh",
    lastName: "Thakuri",
    email: "dinesh@gmail.com",
    address: "ktm",
  },
];

//add user
router.post("/user/add", (req, res) => {
  const newUser = req.body;
  userList.push(newUser);
  return res.status(201).send({ message: "User is added successfully" });
});
//list user
router.get("/user/list", (req, res) => {
  return res.status(200).send(userList);
});
//edit user
router.put("/user/edit/:id", (req, res) => {
  const userIdToBeEdited = +req.params.id;
  const newVales = req.body;
  const requiredUser = userList.find((item) => {
    return item.id === userIdToBeEdited;
  });
  if (!requiredUser) {
    return res.status(404).send({ message: "User doesnt exist" });
  }
  const updatedUserList = userList.map((item) => {
    if (item.id === userIdToBeEdited) {
      return { ...item, ...newVales };
    } else {
      return item;
    }
  });
  userList = structuredClone(updatedUserList);
  return res.status(200).send({ message: "User id updated sucessfully" });
});
//delete user
router.delete("/user/delete/:id", (req, res) => {
  const userIdToBeDeleted = +req.params.id;
  const requiredUser = userList.find((item) => {
    return item.id === userIdToBeDeleted;
  });
  if (!requiredUser) {
    return res.status(404).send({ message: "User doesnt exists" });
  }
  const newUserList = userList.filter((item) => {
    return item.id !== userIdToBeDeleted;
  });
  userList = structuredClone(newUserList);
  return res.status(200).send({ message: "User id is deleted successfully" });
});

router.get("/user/details/:id", (req, res) => {
  //extract movie id from params
  const userId = +req.params.id;
  //check if movie with provided id exists
  const requiredUser = userList.find((item, index, self) => {
    if (item.id == userId) {
      return item;
    }
  });
  //if not movie,throw error
  if (!requiredUser) {
    return res.status(404).send({ message: "User does not exists." });
  }
  //return response with movie details
  return res.status(200).send(requiredUser);
});

export default router;
