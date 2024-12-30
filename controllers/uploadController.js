const multer = require('multer');
const path = require('path');
const asyncHandler = require('express-async-handler');

class UploadController {
    constructor() {
        // Cấu hình multer
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'uploads/'); // Đường dẫn lưu trữ tệp
            },
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, `${uniqueSuffix}-${file.originalname}`);
            },
        });

        this.upload = multer({
            storage: storage,
            limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn kích thước: 5MB mỗi tệp
            fileFilter: (req, file, cb) => {
                const fileTypes = /jpeg|jpg|png/;
                const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
                const mimeType = fileTypes.test(file.mimetype);

                if (extName && mimeType) {
                    cb(null, true);
                } else {
                    cb(new Error('Chỉ chấp nhận các định dạng ảnh: JPEG, JPG, PNG!'));
                }
            },
        });
    }

    // Upload một tệp
    uploadSingle = asyncHandler((req, res) => {
        this.upload.single('image')(req, res, (err) => {
            if (err) {
                return res.status(400).json({
                    message: 'Upload thất bại!',
                    error: err.message,
                });
            }

            if (!req.file) {
                return res.status(400).json({
                    message: 'Không có tệp nào được tải lên!',
                });
            }

            res.status(200).json({
                message: 'Upload thành công!',
                file: req.file,
            });
        });
    });

    // Upload nhiều tệp
    uploadMultiple = asyncHandler((req, res) => {
        this.upload.array('images', 10)(req, res, (err) => { // Cho phép tối đa 10 tệp
            console.log(err)
            if (err) {
                return res.status(400).json({
                    message: 'Upload thất bại!',
                    error: err.message,
                });
            }

            if (!req.files || req.files.length === 0) {
                return res.status(400).json({
                    message: 'Không có tệp nào được tải lên!',
                });
            }

            res.status(200).json({
                message: 'Upload thành công!',
                files: req.files,
            });
        });
    });
}

module.exports = new UploadController();
