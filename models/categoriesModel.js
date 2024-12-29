const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const generateSlug = (str) => {
    return str
        .toLowerCase()
        .normalize("NFD") // Chuẩn hóa chuỗi Unicode
        .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu tiếng Việt
        .trim()
        .replace(/[^a-z0-9\s-]/g, "") // Loại bỏ ký tự đặc biệt
        .replace(/\s+/g, "-"); // Thay khoảng trắng bằng dấu gạch ngang
};
const categoriesModel = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            unique: true, // Bảo đảm slug là duy nhất
        },
    },
    {
        timestamps: true,
    }
);

// Middleware để tự động tạo slug trước khi lưu
categoriesModel.pre("save", function (next) {
    if (this.isModified("name") || this.isNew) {
        this.slug = generateSlug(this.name);
    }
    next();
});


module.exports = mongoose.model("Categories", categoriesModel);

