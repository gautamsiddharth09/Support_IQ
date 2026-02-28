import { model, Schema } from "mongoose";
import mongoose from "mongoose";


interface ISetting {
  ownerId: string;
  businessName?: string;
  supportEmail?: string;
  knowledge?: string;
}
const settingSchema = new Schema(
  {
    ownerId: {
       type: String,
      required: true,
      unique: true,
    },

    businessName: {
      type: String,
    },

    supportEmail: {
      type: String,
    },

    knowledge: {
      type: String,
    },
  },
  { timestamps: true },
);
const Setting =
  mongoose.models.Setting ||
  mongoose.model<ISetting>("Setting", settingSchema);

export default Setting;