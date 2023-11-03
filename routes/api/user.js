const router = require("express").Router();
const User = require("../../db/models/user");

// const { uploadImage, s3 } = require("../../middleware/uploadImage");
// router.post(
//   "/update-photo",
//   uploadImage.single("image"),
//   async (req, res, next) => {
//     try {
//       const photoUrl = req.file.location; // Get the S3 URL of the uploaded photo

//       if (!req.user) {
//         return res.status(404).json({ error: "User not found" });
//       }

//       let data = {};
//       if (req.file) {
//         data.image = req.file.location;
//       }
//       // If user already has a photoUrl, delete the old photo from S3
//       if (req.user.photoUrl) {
//         const oldPhotoKey = req.user.photoUrl.split("/").pop();
//         await s3
//           .deleteObject({
//             Bucket: process.env.S3_BUCKET_NAME,
//             Key: `user_photos/${oldPhotoKey}`,
//           })
//           .promise();
//       }

//       req.user.photoUrl = photoUrl;
//       await req.user.save();

//       res.json(req.user);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

module.exports = router;
