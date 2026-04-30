import express from "express";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/notesController.js";

import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", verifyToken, getNotes);        
router.post("/", verifyToken, createNote);     
router.put("/:id", verifyToken, updateNote);   
router.delete("/:id", verifyToken, deleteNote); 

export default router;