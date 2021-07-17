const Document = require('../models/document');
const connectMongoDB = require('../connection/mongodb');

const listDocuments = async (req, res) => {
  try {
    await connectMongoDB();

    const docs = await Document.find();

    return res.status(200).json(docs);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const findDocument = async (req, res) => {
  const { id } = req.params;

  try {
    await connectMongoDB();

    const doc = await Document.findById(id);

    return res.status(200).json(doc);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const createDocument = async (req, res) => {
  const {
    kbSize, name, content, createdAt,
  } = req.body;

  const doc = new Document({
    name,
    content,
    kbSize,
    createdAt,
  });

  try {
    await connectMongoDB();

    const savedDoc = await doc.save();

    if (!savedDoc) {
      const errorMessage = 'Upload failed! Try again later.';
      return res.status(400).json(errorMessage);
    }

    return res.status(200).json(savedDoc);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const deleteDocument = async (req, res) => {
  const { id } = req.params;

  try {
    await connectMongoDB();

    // Actual deletion:
    // const docDeleted = await Document.findByIdAndDelete(id);

    // Simulated deletion:
    const docDeleted = await Document.findByIdAndUpdate(id, { deletedAt: Date() }, { new: true });

    return res.status(200).json(docDeleted);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  listDocuments,
  findDocument,
  createDocument,
  deleteDocument,
};
