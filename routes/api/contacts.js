const express = require("express");
const Joi = require("joi");

const contacts = require("../../models/contacts");
const { HttpError } = require("../../helpers");
const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);

    if (!result) {
      throw HttpError(404, "Not fount");
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const { error } = addSchema.validate(data);

    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await contacts.addContact(data);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id);

    if (!result) {
      throw HttpError(404, "Not fount");
    }

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!data.name && !data.email && !data.phone) {
      throw HttpError(404, "missing fields");
    }

    const { error } = addSchema.validate(data);
    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await contacts.updateContact(id, data);
    if (!result) {
      throw HttpError(404, "Not fount");
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
