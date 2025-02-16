const JobModel = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const Job = require("../models/Job");

const getAllJobs = async (req, res) => {
  //only looking for jobs associated with the user
  const jobs = await Job.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length || 0 });
};
const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await JobModel.create(req.body);
  console.log(job, "---------1-----------");
  res.status(StatusCodes.CREATED).json({ job });
};
const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;
  if (company === "" || position === "") {
    throw new BadRequestError("Company or Position fields cannot be empty");
  }
  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};
const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findOneAndRemove({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`job not found with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job, msg: `job deleted` });
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
