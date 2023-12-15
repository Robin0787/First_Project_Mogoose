import { Schema, model } from "mongoose";
import validator from "validator";
import { TFaculty, TFacultyName } from "./faculty.interface";

const facultyNameSchema = new Schema<TFacultyName>({
  firstName: {
    type: String,
    required: [true, "firstName is required"],
    trim: true,
    maxLength: [20, "firstName can't be more than 20 characters"],
    validate: {
      validator: function (value: string) {
        const formateValue = value.split(" ").join("");
        const capitalizedValue =
          formateValue.charAt(0).toUpperCase() +
          formateValue.slice(1).toLowerCase();
        return capitalizedValue === value;
      },
      message: "{VALUE} is not in capitalize format like 'Robin'",
    },
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: [true, "lastName is required"],
    trim: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: "{VALUE} is not valid.",
    },
  },
});

const facultySchema = new Schema<TFaculty>(
  {
    id: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "user",
    },
    name: {
      type: facultyNameSchema,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: false,
    },
    contactNo: {
      type: String,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "academicDepartment",
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "academicFaculty",
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
      required: false,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: false,
    },
    isDeleted: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Faculty = model<TFaculty>("faculty", facultySchema);
