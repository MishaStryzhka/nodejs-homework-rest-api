// const fs = require("fs").promises;
// const { nanoid } = require("nanoid");
// const path = require("path");

// const contactsPath = path.join(__dirname, "contacts.json");

// const listContacts = async () => {
//   const result = await fs.readFile(contactsPath);
//   return JSON.parse(result);
// };

// const getContactById = async (contactId) => {
//   const contacts = await listContacts();
//   const result = contacts.find((contact) => contact.id === contactId);
//   return result || null;
// };

// const removeContact = async (contactId) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((contact) => contact.id === contactId);
//   if (index === -1) {
//     return null;
//   }
//   const [result] = contacts.splice(index, 1);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return result;
// };

// const addContact = async (body) => {
//   console.log(body)
//   const newContact = { id: nanoid(), ...body };
//   const contacts = await listContacts();
//   contacts.push(newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return newContact;
// };

// const updateContact = async (id, data) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((contact) => contact.id === id);
//   if (index === -1) {
//     return null;
//   }
//   contacts[index] = { id, ...data };
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return contacts[index];
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
