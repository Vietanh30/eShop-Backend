const Message = require("../models/messageModel.js");
const asyncHandler = require("express-async-handler");
const moment = require("moment");
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const MODEL_NAME = "gemini-1.0-pro";

// const MODEL_NAME = "tunedModels/emobilellm-q11jc35aebrb";

class MessageController {
  //  [ POST - ROUTE: api/user]
  sendMessage = asyncHandler(async (req, res) => {
    const { prompt } = req.body;

    await Message.create({
      user: req.user._id,
      typeUser: "user",
      typeMessage: "text",
      content: prompt,
      startTime: moment().format("DD-MM-YYYY HH:mm:ss"),
    });

    const genAI = new GoogleGenerativeAI(process.env.API_KEY);

    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 8192,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const parts = [
      { text: "input: Redmi Note 12 (8GB/128GB) có mấy màu?" },
      {
        text: "output: + Redmi Note 12 (8GB/128GB) có 4 màu: Màu Đen, Xanh Lá, Xanh Dương và Vàng.\nTheo dõi sản phẩm `664cdba350acbc37fcc45c9d`",
      },
      { text: "input: Redmi Note 12 (8GB/128GB) có giá bao nhiêu?" },
      {
        text: "output: + Giá của Redmi Note 12 (8GB/128GB) là 4.990.000 VNĐ.\nTheo dõi sản phẩm `664cdba350acbc37fcc45c9d`",
      },
      { text: "input: Redmi Note 12 (8GB/128GB) có những ưu đãi gì?" },
      {
        text: "output: + Redmi Note 12 (8GB/128GB) có những ưu đãi sau:\n- Shinhan Finance - Ưu đãi trả góp 0% qua Shinhan Finance.\n- TPBank EVO - Ưu đãi giảm 40% tối đa 400.000đ khi mở thẻ tín dụng TPBank EVO thành công.\n- Home PayLater - Trả góp qua Home PayLater giảm tới 1.000.000đ\n- VPBank - Mở thẻ VPBank, dùng Apple Pay, ưu đãi tới 1.250.000đ.\n- ZaloPay - Giảm 1% tối đa 300.000đ khi thanh toán qua ZaloPay.\n- VIB - Nhận Voucher 250.000đ khi mở thẻ tín dụng VIB thành công.\n- Kredivo - Ưu đãi tới 200.000đ khi mua trước trả sau qua Kredivo.\n- Tặng SIM Wintel (Áp dụng tại các chi nhánh độc lập với đơn hàng mua Điện thoại, Máy tính bảng, Đồng hồ hoặc các sản phẩm khác với hoá đơn trên 2.000.000đ).\n- Giảm thêm tới 1.000.000đ khi tham gia Thu cũ - Lên đời điện thoại Android\n- Giảm thêm 200.000đ cho tất các sản phẩm màn hình khi mua kèm Laptop, MacBook, Máy tính bảng và Điện thoại.\nTheo dõi sản phẩm `664cdba350acbc37fcc45c9d`",
      },
      { text: "input: Redmi Note 12 (8GB/128GB) có mấy camera?" },
      {
        text: "output: + Redmi Note 12 (8GB/128GB) có 3 camera sau và 1 camera trước.\nTheo dõi sản phẩm `664cdba350acbc37fcc45c9d`",
      },
      { text: "input: Redmi Note 12 (8GB/128GB) có khả năng sạc nhanh không?" },
      {
        text: "output: + Có, Redmi Note 12 (8GB/128GB) có khả năng sạc nhanh 33W với công nghệ MMT.\nTheo dõi sản phẩm `664cdba350acbc37fcc45c9d`",
      },
      { text: "input: Redmi Note 12 (8GB/128GB) có chống nước không?" },
      {
        text: "output: + Câu hỏi không được trả lời từ dữ liệu đã cung cấp.\nTheo dõi sản phẩm `664cdba350acbc37fcc45c9d`",
      },
      { text: "input: Redmi Note 12 (8GB/128GB) sử dụng hệ điều hành gì?" },
      {
        text: "output: + Redmi Note 12 (8GB/128GB) sử dụng hệ điều hành MIUI 14 Trên nền tảng Android 13.\nTheo dõi sản phẩm `664cdba350acbc37fcc45c9d`",
      },
      { text: "input: Redmi Note 12 (8GB/128GB) có hỗ trợ kết nối 5G không?" },
      {
        text: "output: + Không, Redmi Note 12 (8GB/128GB) không hỗ trợ kết nối 5G.\nTheo dõi sản phẩm `664cdba350acbc37fcc45c9d`",
      },
      { text: "input: Redmi Note 12 (8GB/128GB) có mấy khe cắm SIM?" },
      {
        text: "output: + Redmi Note 12 (8GB/128GB) có 2 khe cắm SIM nano.\nTheo dõi sản phẩm `664cdba350acbc37fcc45c9d`",
      },
      { text: "input: Redmi Note 12 (8GB/128GB) có dung lượng pin bao nhiêu?" },
      {
        text: "output: + Redmi Note 12 (8GB/128GB) có dung lượng pin 5.000mAh.\nTheo dõi sản phẩm `664cdba350acbc37fcc45c9d`",
      },
      {
        text: "input: Redmi Note 12 (8GB/128GB) có hỗ trợ thẻ nhớ ngoài không?",
      },
      {
        text: "output: + Câu hỏi không được trả lời từ dữ liệu đã cung cấp.\nTheo dõi sản phẩm `664cdba350acbc37fcc45c9d`",
      },
      { text: "input: Vivo Y22s 8GB/128GB có màu gì?" },
      {
        text: "output: + Xanh đen và xanh vàng Theo dõi sản phẩm `664cdba350acbc37fcc45c9e`",
      },
      { text: "input: Vivo Y22s 8GB/128GB có mạng gì?" },
      {
        text: "output: + Hỗ trợ 4G Theo dõi sản phẩm `664cdba350acbc37fcc45c9e`",
      },
      { text: "input: Vivo Y22s 8GB/128GB có chip gì?" },
      {
        text: "output: + Snapdragon 680 8 nhân Theo dõi sản phẩm `664cdba350acbc37fcc45c9e`",
      },
      { text: "input: Vivo Y22s 8GB/128GB có bao nhiêu sim?" },
      {
        text: "output: + 2 Nano SIM Theo dõi sản phẩm `664cdba350acbc37fcc45c9e`",
      },
      { text: "input: Vivo Y22s 8GB/128GB có thời lượng pin là bao lâu?" },
      {
        text: "output: + 5000mAh Theo dõi sản phẩm `664cdba350acbc37fcc45c9e`",
      },
      { text: "input: Vivo Y22s 8GB/128GB có giá bao nhiêu?" },
      {
        text: "output: + 4.590.000 VND Theo dõi sản phẩm `664cdba350acbc37fcc45c9e`",
      },
      { text: "input: Vivo Y22s 8GB/128GB có camera sau mấy MP?" },
      { text: "output: + 50MP Theo dõi sản phẩm `664cdba350acbc37fcc45c9e`" },
      { text: "input: Vivo Y22s 8GB/128GB có sạc nhanh không?" },
      {
        text: "output: + Có, sạc nhanh 18W Theo dõi sản phẩm `664cdba350acbc37fcc45c9e`",
      },
      { text: "input: Vivo Y22s 8GB/128GB có bao nhiêu RAM và ROM?" },
      {
        text: "output: + RAM 8GB, ROM 128GB Theo dõi sản phẩm `664cdba350acbc37fcc45c9e`",
      },
      { text: "input: Vivo Y22s 8GB/128GB có hệ điều hành gì?" },
      {
        text: "output: + Android 12 Theo dõi sản phẩm `664cdba350acbc37fcc45c9e`",
      },
      { text: "input: Vivo Y16 4GB/128GB có mấy màu?" },
      {
        text: "output: Màu Vàng và Màu Đen. Theo dõi sản phẩm `664cdba350acbc37fcc45c9f`",
      },
      { text: "input: Vivo Y16 4GB/128GB bao nhiêu tiền?" },
      {
        text: "output: 3.450.000 VNĐ. Theo dõi sản phẩm `664cdba350acbc37fcc45c9f`",
      },
      { text: "input: Vivo Y16 4GB/128GB có camera trước bao nhiêu MP?" },
      { text: "output: 5 MP. Theo dõi sản phẩm `664cdba350acbc37fcc45c9f`" },
      { text: "input: Vivo Y16 4GB/128GB có những ưu đãi gì?" },
      {
        text: "output: Shinhan Finance - Ưu đãi trả góp 0% qua Shinhan Finance., TPBank EVO - Ưu đãi giảm 40% tối đa 400.000đ khi mở thẻ tín\\xa0dụng\\xa0TPBank\\xa0EVO thành công., Home PayLater - Trả góp qua Home PayLater giảm tới 1.000.000đ, VPBank - Mở thẻ VPBank, dùng Apple Pay, ưu đãi tới 1.250.000đ., ZaloPay - Giảm 1% tối đa 300.000đ khi thanh toán qua ZaloPay., VIB - Nhận Voucher 250.000đ khi mở thẻ tín dụng VIB thành công., Kredivo - Ưu đãi tới 200.000đ khi mua trước trả sau qua Kredivo., Tặng SIM Wintel (Áp dụng tại các chi nhánh độc lập với đơn hàng mua Điện thoại, Máy tính bảng, Đồng hồ hoặc các sản phẩm khác với hoá đơn trên 2.000.000đ)., Giảm thêm tới 1.000.000đ khi tham gia Thu cũ - Lên đời điện thoại Android, Giảm thêm 200.000đ cho tất các sản phẩm màn hình khi mua kèm Laptop, MacBook, Máy tính bảng và Điện thoại.. Theo dõi sản phẩm `664cdba350acbc37fcc45c9f`",
      },
      { text: "input: Vivo Y16 4GB/128GB có công nghệ màn hình nào?" },
      { text: "output: IPS LCD. Theo dõi sản phẩm `664cdba350acbc37fcc45c9f`" },
      { text: "input: Vivo Y16 4GB/128GB có chip sản xuất gì?" },
      {
        text: "output: MediaTek Helio P35. Theo dõi sản phẩm `664cdba350acbc37fcc45c9f`",
      },
      {
        text: "input: Vivo Y16 4GB/128GB có hỗ trợ công nghệ sạc nhanh không?",
      },
      {
        text: "output: Có, hỗ trợ công nghệ sạc nhanh 10W. Theo dõi sản phẩm `664cdba350acbc37fcc45c9f`",
      },
      {
        text: "input: Vivo Y16 4GB/128GB có những tính năng bảo vệ mắt không?",
      },
      {
        text: "output: Có, có chế độ bảo vệ mắt khỏi ánh sáng xanh và tự động điều chỉnh theo môi trường xung quanh. Theo dõi sản phẩm `664cdba350acbc37fcc45c9f`",
      },
      { text: "input: Vivo Y16 4GB/128GB có hỗ trợ kết nối Bluetooth không?" },
      {
        text: "output: Có, hỗ trợ kết nối Bluetooth 5.0. Theo dõi sản phẩm `664cdba350acbc37fcc45c9f`",
      },
      { text: "input: Vivo Y16 4GB/128GB có mấy sim?" },
      {
        text: "output: 2 Nano SIM. Theo dõi sản phẩm `664cdba350acbc37fcc45c9f`",
      },
      { text: "input: Oppo A17 4GB/64GB Pin 5000mah - Chính hãng có màu gì?" },
      {
        text: "output: Màu đen và xanh nước biển Theo dõi sản phẩm `664cdba350acbc37fcc45ca0`",
      },
      {
        text: "input: Oppo A17 4GB/64GB Pin 5000mah - Chính hãng dùng hệ điều hành gì?",
      },
      {
        text: "output: Android 12 Theo dõi sản phẩm `664cdba350acbc37fcc45ca0`",
      },
      {
        text: "input: Oppo A17 4GB/64GB Pin 5000mah - Chính hãng có loại kết nối mạng nào?",
      },
      {
        text: "output: Hỗ trợ 4G Theo dõi sản phẩm `664cdba350acbc37fcc45ca0`",
      },
      {
        text: "input: Oppo A17 4GB/64GB Pin 5000mah - Chính hãng có bao nhiêu khe sim?",
      },
      {
        text: "output: 2 Nano SIM Theo dõi sản phẩm `664cdba350acbc37fcc45ca0`",
      },
      {
        text: "input: Oppo A17 4GB/64GB Pin 5000mah - Chính hãng có dung lượng pin bao nhiêu?",
      },
      { text: "output: 5000 mAh Theo dõi sản phẩm `664cdba350acbc37fcc45ca0`" },
      {
        text: "input: Oppo A17 4GB/64GB Pin 5000mah - Chính hãng có hỗ trợ khả năng sạc nhanh không?",
      },
      {
        text: "output: Không có thông tin Theo dõi sản phẩm `664cdba350acbc37fcc45ca0`",
      },
      {
        text: "input: Oppo A17 4GB/64GB Pin 5000mah - Chính hãng giá bao nhiêu?",
      },
      {
        text: "output: 3.590.000 VNĐ Theo dõi sản phẩm `664cdba350acbc37fcc45ca0`",
      },
      {
        text: "input: Oppo A17 4GB/64GB Pin 5000mah - Chính hãng có tích hợp cảm biến vân tay không?",
      },
      {
        text: "output: Không có thông tin Theo dõi sản phẩm `664cdba350acbc37fcc45ca0`",
      },
      {
        text: "input: Oppo A17 4GB/64GB Pin 5000mah - Chính hãng có màn hình tần số quét bao nhiêu Hz?",
      },
      {
        text: "output: Không có thông tin Theo dõi sản phẩm `664cdba350acbc37fcc45ca0`",
      },
      {
        text: "input: Oppo A17 4GB/64GB Pin 5000mah - Chính hãng hỗ trợ thẻ nhớ tối đa bao nhiêu GB?",
      },
      { text: "output: 512GB Theo dõi sản phẩm `664cdba350acbc37fcc45ca0`" },
      { text: "input: Oppo A16K 4GB/64GB có những màu sắc gì?" },
      {
        text: "output: + Các màu sắc của Oppo A16K 4GB/64GB là Trắng và Đen mạnh mẽ. Theo dõi sản phẩm `664cdba350acbc37fcc45ca1`",
      },
      { text: "input: Oppo A16K 4GB/64GB có giá bao nhiêu?" },
      {
        text: "output: + Giá của Oppo A16K 4GB/64GB là 2.890.000 VNĐ. Theo dõi sản phẩm ` item.id `",
      },
      { text: "input: Oppo A16K 4GB/64GB sử dụng hệ điều hành nào?" },
      {
        text: "output: + Hệ điều hành được sử dụng trên Oppo A16K 4GB/64GB là Android 11. Theo dõi sản phẩm `664cdba350acbc37fcc45ca1`",
      },
      { text: "input: Oppo A16K 4GB/64GB có hỗ trợ chụp ảnh macro không?" },
      {
        text: "output: + Có, Oppo A16K 4GB/64GB có camera macro 2MP. Theo dõi sản phẩm `664cdba350acbc37fcc45ca1`",
      },
      { text: "input: Oppo A16K 4GB/64GB có hỗ trợ sạc nhanh không?" },
      {
        text: "output: + Có, Oppo A16K 4GB/64GB hỗ trợ sạc nhanh 18W. Theo dõi sản phẩm `664cdba350acbc37fcc45ca1`",
      },
      { text: "input: Oppo A16K 4GB/64GB có khả năng chống nước không?" },
      {
        text: "output: + Oppo A16K 4GB/64GB có chứng nhận kháng nước IPX48. Theo dõi sản phẩm `664cdba350acbc37fcc45ca1`",
      },
      { text: "input: Oppo A16K 4GB/64GB có dung lượng pin bao nhiêu?" },
      {
        text: "output: + Dung lượng pin của Oppo A16K 4GB/64GB là 5.000mAh. Theo dõi sản phẩm `664cdba350acbc37fcc45ca1`",
      },
      {
        text: "input: Oppo A16K 4GB/64GB có thể mở rộng bộ nhớ qua thẻ nhớ không?",
      },
      {
        text: "output: + Có, Oppo A16K 4GB/64GB có thể mở rộng bộ nhớ qua thẻ nhớ microSD (tối đa 1TB). Theo dõi sản phẩm `664cdba350acbc37fcc45ca1`",
      },
      { text: "input: Oppo A16K 4GB/64GB có hỗ trợ kết nối 4G không?" },
      {
        text: "output: + Có, Oppo A16K 4GB/64GB hỗ trợ kết nối 4G. Theo dõi sản phẩm `664cdba350acbc37fcc45ca1`",
      },
      { text: "input: Oppo A16K 4GB/64GB có mấy khe cắm SIM?" },
      {
        text: "output: + Oppo A16K 4GB/64GB có 2 khe cắm Nano SIM. Theo dõi sản phẩm `664cdba350acbc37fcc45ca1`",
      },
      { text: "input: Nokia G11 Plus (3GB/32GB) có giá bao nhiêu?" },
      {
        text: "output: Giá của Nokia G11 Plus (3GB/32GB) là 1.950.000 VNĐ. Theo dõi sản phẩm `664cdba350acbc37fcc45ca2`",
      },
      { text: "input: Nokia G11 Plus (3GB/32GB) có những màu sắc nào?" },
      {
        text: "output: Nokia G11 Plus (3GB/32GB) có 2 màu sắc: Đen và Xanh. Theo dõi sản phẩm `664cdba350acbc37fcc45ca2`",
      },
      {
        text: "input: Màn hình của Nokia G11 Plus (3GB/32GB) có kích thước bao nhiêu?",
      },
      {
        text: "output: Nokia G11 Plus (3GB/32GB) có màn hình 6,5 inch. Theo dõi sản phẩm `664cdba350acbc37fcc45ca2`",
      },
      {
        text: "input: Nokia G11 Plus (3GB/32GB) có độ phân giải màn hình là bao nhiêu?",
      },
      {
        text: "output: Độ phân giải màn hình của Nokia G11 Plus (3GB/32GB) là HD+ (720 x 1600 Pixels). Theo dõi sản phẩm `664cdba350acbc37fcc45ca2`",
      },
      {
        text: "input: Nokia G11 Plus (3GB/32GB) sử dụng công nghệ màn hình nào?",
      },
      {
        text: "output: Nokia G11 Plus (3GB/32GB) sử dụng công nghệ màn hình TFT LCD. Theo dõi sản phẩm `664cdba350acbc37fcc45ca2`",
      },
      { text: "input: Bộ vi xử lý của Nokia G11 Plus (3GB/32GB) là gì?" },
      {
        text: "output: Bộ vi xử lý của Nokia G11 Plus (3GB/32GB) là ARM Unisoc T606 8 lõi. Theo dõi sản phẩm `664cdba350acbc37fcc45ca2`",
      },
      {
        text: "input: Nokia G11 Plus (3GB/32GB) có dung lượng lưu trữ là bao nhiêu?",
      },
      {
        text: "output: Nokia G11 Plus (3GB/32GB) có dung lượng lưu trữ là 32GB. Theo dõi sản phẩm `664cdba350acbc37fcc45ca2`",
      },
      {
        text: "input: Nokia G11 Plus (3GB/32GB) có dung lượng RAM là bao nhiêu?",
      },
      {
        text: "output: Nokia G11 Plus (3GB/32GB) có dung lượng RAM là 3GB. Theo dõi sản phẩm `664cdba350acbc37fcc45ca2`",
      },
      { text: "input: Nokia G11 Plus (3GB/32GB) chạy trên hệ điều hành nào?" },
      {
        text: "output: Nokia G11 Plus (3GB/32GB) chạy trên hệ điều hành Android 12. Theo dõi sản phẩm `664cdba350acbc37fcc45ca2`",
      },
      {
        text: "input: Nokia G11 Plus (3GB/32GB) có viên pin dung lượng bao nhiêu?",
      },
      {
        text: "output: Nokia G11 Plus (3GB/32GB) có viên pin dung lượng 5000mAh. Theo dõi sản phẩm `664cdba350acbc37fcc45ca2`",
      },
      { text: "input: Samsung Galaxy A04 có giá bao nhiêu?" },
      {
        text: "output: Giá của Samsung Galaxy A04 là 1.990.000 VNĐ. Theo dõi sản phẩm `664cdba350acbc37fcc45ca3`",
      },
      { text: "input: Samsung Galaxy A04 có những màu sắc nào?" },
      {
        text: "output: Samsung Galaxy A04 có 3 màu sắc: Đồng, Xanh và Đen. Theo dõi sản phẩm `664cdba350acbc37fcc45ca3`",
      },
      { text: "input: Samsung Galaxy A04 có những ưu đãi gì?" },
      {
        text: "output: Samsung Galaxy A04 có các ưu đãi sau:\n+ Samsung Finance+: Ưu đãi trả góp 0% qua Samsung Finance+ (Áp dụng tại 57 chi nhánh).\n+ TPBank EVO: Ưu đãi giảm 40% tối đa 400.000đ khi mở thẻ tín dụng TPBank EVO thành công.\n+ Home PayLater: Trả góp qua Home PayLater giảm tới 1.000.000đ\n+ VPBank: Mở thẻ VPBank, dùng Apple Pay, ưu đãi tới 1.250.000đ.\n+ ZaloPay: Giảm 1% tối đa 300.000đ khi thanh toán qua ZaloPay.\n+ VIB: Nhận Voucher 250.000đ khi mở thẻ tín dụng VIB thành công.\n+ Kredivo: Ưu đãi tới 200.000đ khi mua trước trả sau qua Kredivo.\n+ Tặng SIM Wintel (Áp dụng tại các chi nhánh độc lập với đơn hàng mua Điện thoại, Máy tính bảng, Đồng hồ hoặc các sản phẩm khác với hoá đơn trên 2.000.000đ).\n+ Giảm thêm tới 1.000.000đ khi tham gia Thu cũ - Lên đời điện thoại Android\n+ Giảm thêm 200.000đ cho tất các sản phẩm màn hình khi mua kèm Laptop, MacBook, Máy tính bảng và Điện thoại.\nTheo dõi sản phẩm `664cdba350acbc37fcc45ca3`",
      },
      { text: "input: Samsung Galaxy A04 dùng chip gì?" },
      {
        text: "output: Samsung Galaxy A04 dùng chip MediaTek Helio P35 8 nhân. Theo dõi sản phẩm `664cdba350acbc37fcc45ca3`",
      },
      { text: "input: Samsung Galaxy A04 có viên pin dung lượng bao nhiêu?" },
      {
        text: "output: Samsung Galaxy A04 có viên pin dung lượng 5000mAh. Theo dõi sản phẩm `664cdba350acbc37fcc45ca3`",
      },
      { text: "input: realme C30s 2GB/32GB có màu nào?" },
      {
        text: "output: + realme C30s 2GB/32GB có 2 màu là Xanh và Đen. Theo dõi sản phẩm `664cdba350acbc37fcc45ca4`",
      },
      { text: "input: realme C30s 2GB/32GB bao nhiêu inch?" },
      {
        text: "output: + realme C30s 2GB/32GB có kích thước màn hình 6.5 inch. Theo dõi sản phẩm `664cdba350acbc37fcc45ca4`",
      },
      { text: "input: realme C30s 2GB/32GB dùng hệ điều hành gì?" },
      {
        text: 'output: + realme C30s 2GB/32GB dùng hệ điều hành "realme UI Go Edition, Trên nền tảng Android 12". Theo dõi sản phẩm `664cdba350acbc37fcc45ca4`',
      },
      { text: "input: realme C30s 2GB/32GB có hỗ trợ mạng 5G không?" },
      {
        text: "output: + Không, realme C30s 2GB/32GB không hỗ trợ mạng 5G. Theo dõi sản phẩm `664cdba350acbc37fcc45ca4`",
      },
      {
        text: "input: Ở phân khúc giá rẻ, realme C30s 2GB/32GB có là sự lựa chọn phù hợp không?",
      },
      {
        text: "output: + Theo bài viết, realme C30s 2GB/32GB là sự lựa chọn không tồi ở phân khúc giá rẻ, phù hợp với những người dùng không cần thực hiện nhiều tác vụ trên điện thoại. Theo dõi sản phẩm `664cdba350acbc37fcc45ca4`",
      },
      { text: "input: realme C30s 2GB/32GB có dung lượng pin bao nhiêu?" },
      {
        text: "output: + realme C30s 2GB/32GB có dung lượng pin lên đến 5000mAh. Theo dõi sản phẩm `664cdba350acbc37fcc45ca4`",
      },
      {
        text: "input: realme C30s 2GB/32GB có những tính năng chụp ảnh nổi bật nào?",
      },
      {
        text: "output: + realme C30s 2GB/32GB sở hữu một số tính năng chụp ảnh như: chụp đêm, bộ lọc màu, HDR, xóa phông... Theo dõi sản phẩm `664cdba350acbc37fcc45ca4`",
      },
      { text: "input: realme C30s 2GB/32GB giá bao nhiêu?" },
      {
        text: "output: + realme C30s 2GB/32GB có giá là 1.750.000 VNĐ. Theo dõi sản phẩm `664cdba350acbc37fcc45ca4`",
      },
      { text: "input: E Mobile có bán realme C30s 2GB/32GB không?" },
      {
        text: "output: + Dựa trên dữ liệu cung cấp, không có thông tin cho biết E Mobile có bán realme C30s 2GB/32GB hay không. Theo dõi sản phẩm `664cdba350acbc37fcc45ca4`",
      },
      { text: "input: realme C30s 2GB/32GB có điểm gì nổi bật?" },
      {
        text: "output: + realme C30s 2GB/32GB có một số điểm nổi bật như: thiết kế đẹp mắt, màn hình 6.5 inch, thời lượng pin dài và giá thành phải chăng. Theo dõi sản phẩm `664cdba350acbc37fcc45ca4`",
      },
      { text: "input: Nokia 8210 4G có mấy khe SIM?" },
      {
        text: "output: + Nokia 8210 4G hỗ trợ 2 khe Nano SIM. Theo dõi sản phẩm `664cdba350acbc37fcc45ca5`",
      },
      { text: "input: Nokia 8210 4G hỗ trợ mạng di động nào?" },
      {
        text: "output: + Nokia 8210 4G hỗ trợ mạng di động 4G LTE. Theo dõi sản phẩm `664cdba350acbc37fcc45ca5`",
      },
      { text: "input: Dung lượng pin của Nokia 8210 4G là bao nhiêu?" },
      {
        text: "output: + Nokia 8210 4G có viên pin dung lượng 1450 mAh. Theo dõi sản phẩm `664cdba350acbc37fcc45ca5`",
      },
      { text: "input: Nokia 8210 4G có hỗ trợ Bluetooth không?" },
      {
        text: "output: + Nokia 8210 4G hỗ trợ Bluetooth 5.0. Theo dõi sản phẩm `664cdba350acbc37fcc45ca5`",
      },
      { text: "input: Nokia 8210 4G có hỗ trợ khe cắm tai nghe không?" },
      {
        text: "output: + Nokia 8210 4G có hỗ trợ jack cắm tai nghe. Theo dõi sản phẩm `664cdba350acbc37fcc45ca5`",
      },
      { text: "input: Nokia 8210 4G có hỗ trợ nghe nhạc không?" },
      {
        text: "output: + Nokia 8210 4G hỗ trợ nghe nhạc thông qua jack cắm tai nghe hoặc loa ngoài. Theo dõi sản phẩm `664cdba350acbc37fcc45ca5`",
      },
      { text: "input: Nokia 8210 4G có hỗ trợ thẻ nhớ ngoài không?" },
      {
        text: "output: + Thông tin về hỗ trợ thẻ nhớ ngoài của Nokia 8210 4G không có trong dữ liệu cung cấp. Theo dõi sản phẩm `664cdba350acbc37fcc45ca5`",
      },
      { text: "input: Nokia 8210 4G có hỗ trợ sạc nhanh không?" },
      {
        text: "output: + Thông tin về hỗ trợ sạc nhanh của Nokia 8210 4G không có trong dữ liệu cung cấp. Theo dõi sản phẩm `664cdba350acbc37fcc45ca5`",
      },
      { text: "input: Nokia 8210 4G có hỗ trợ mạng 5G không?" },
      {
        text: "output: + Nokia 8210 4G không hỗ trợ mạng 5G. Theo dõi sản phẩm `664cdba350acbc37fcc45ca5`",
      },
      { text: "input: Nokia 8210 4G có hỗ trợ kháng nước không?" },
      {
        text: "output: + Thông tin về hỗ trợ kháng nước của Nokia 8210 4G không có trong dữ liệu cung cấp. Theo dõi sản phẩm `664cdba350acbc37fcc45ca5`",
      },
      { text: "input: Điện thoại Itel A26 có những tính năng hấp dẫn gì?" },
      {
        text: "output: + Điện thoại Itel A26 sở hữu các tính năng ấn tượng như: thiết kế thời trang, hệ thống camera kép, cấu hình ổn định và pin dung lượng lớn. Theo dõi sản phẩm `664cdba350acbc37fcc45ca6`",
      },
      { text: "input: Màn hình của Itel A26 có kích thước bao nhiêu?" },
      {
        text: "output: + Điện thoại Itel A26 sở hữu màn hình kích thước 5.7 inch, độ phân giải HD+ cho khả năng hiển thị sắc nét và chân thực. Theo dõi sản phẩm `664cdba350acbc37fcc45ca6`",
      },
      { text: "input: Điện thoại Itel A26 có bao nhiêu màu sắc?" },
      {
        text: "output: + Itel A26 có 3 màu sắc trẻ trung: xanh lá, xanh dương và tím. Theo dõi sản phẩm `664cdba350acbc37fcc45ca6`",
      },
      { text: "input: Dung lượng bộ nhớ trong của Itel A26 là bao nhiêu?" },
      {
        text: "output: + Điện thoại Itel A26 cung cấp bộ nhớ trong 32GB, đủ không gian lưu trữ các ứng dụng, dữ liệu và hình ảnh. Theo dõi sản phẩm `664cdba350acbc37fcc45ca6`",
      },
      { text: "input: Điện thoại Itel A26 hỗ trợ hệ điều hành nào?" },
      {
        text: "output: + Itel A26 có hệ điều hành Android 10 cho trải nghiệm mượt mà và dễ sử dụng. Theo dõi sản phẩm `664cdba350acbc37fcc45ca6`",
      },
      { text: "input: Itel A26 có cảm biến camera sau bao nhiêu MP?" },
      {
        text: "output: + Điện thoại Itel A26 tích hợp hệ thống camera kép sau với cảm biến chính 5MP và camera phụ 5MP, hỗ trợ chụp ảnh xóa phông. Theo dõi sản phẩm `664cdba350acbc37fcc45ca6`",
      },
      { text: "input: Vi xử lý của Điện thoại Itel A26 là loại nào?" },
      {
        text: "output: + Điện thoại Itel A26 được trang bị bộ vi xử lý Spreadtrum SC9832E 28nm với tốc độ xung nhịp 1.4 GHz, đảm bảo hiệu năng ổn định. Theo dõi sản phẩm `664cdba350acbc37fcc45ca6`",
      },
      { text: "input: Điện thoại Itel A26 có hỗ trợ thẻ nhớ ngoài không?" },
      {
        text: "output: + Thông tin về hỗ trợ thẻ nhớ ngoài của Itel A26 không được cung cấp trong dữ liệu. Theo dõi sản phẩm `664cdba350acbc37fcc45ca6`",
      },
      { text: "input: Mặt lưng của Itel A26 làm bằng chất liệu gì?" },
      {
        text: "output: + Mặt lưng của Điện thoại Itel A26 được hoàn thiện từ chất liệu nhựa bền bỉ, hạn chế bám vân tay và trầy xước. Theo dõi sản phẩm `664cdba350acbc37fcc45ca6`",
      },
      {
        text: "input: Dung lượng pin của Điện thoại Itel A26 là bao nhiêu mAh?",
      },
      {
        text: "output: + Điện thoại Itel A26 sở hữu viên pin dung lượng lên tới 3020mAh, đáp ứng nhu cầu sử dụng lâu dài. Theo dõi sản phẩm `664cdba350acbc37fcc45ca6`",
      },
      {
        text: "input: Điện thoại di dộng TCL 305 - CRUZE LITE - Chính hãng có thể chụp ảnh xóa phông bằng camera nào?",
      },
      {
        text: "output: Cảm biến chiều sâu 2MP. Theo dõi sản phẩm `664cdba350acbc37fcc45ca7`",
      },
      {
        text: "input: Điện thoại di dộng TCL 305 - CRUZE LITE - Chính hãng có mấy màu?",
      },
      {
        text: "output: Hai màu: SPACE GREY, ATLANTIC BLUE. Theo dõi sản phẩm `664cdba350acbc37fcc45ca7`",
      },
      {
        text: "input: Điện thoại di dộng TCL 305 - CRUZE LITE - Chính hãng có giá bao nhiêu?",
      },
      {
        text: "output: Giá của Điện thoại di dộng TCL 305 - CRUZE LITE - Chính hãng là 1.590.000 VNĐ. Theo dõi sản phẩm `664cdba350acbc37fcc45ca7`",
      },
      {
        text: "input: Điện thoại di dộng TCL 305 - CRUZE LITE - Chính hãng có mấy khe SIM?",
      },
      {
        text: "output: Hỗ trợ 2 Nano SIM. Theo dõi sản phẩm `664cdba350acbc37fcc45ca7`",
      },
      {
        text: "input: Điện thoại di dộng TCL 305 - CRUZE LITE - Chính hãng dùng hệ điều hành gì?",
      },
      {
        text: "output: Android 11. Theo dõi sản phẩm `664cdba350acbc37fcc45ca7`",
      },
      // {
      //   text: "input: Điện thoại di dộng TCL 305 - CRUZE LITE - Chính hãng có camera selfie bao nhiêu MP?",
      // },
      // {
      //   text: "output: Hỗ trợ 5MP. Theo dõi sản phẩm `664cdba350acbc37fcc45ca7`",
      // },
      // {
      //   text: "input: Điện thoại di dộng TCL 305 - CRUZE LITE - Chính hãng hỗ trợ loại màn hình nào?",
      // },
      // { text: "output: IPS LCD. Theo dõi sản phẩm `664cdba350acbc37fcc45ca7`" },
      // {
      //   text: "input: Điện thoại di dộng TCL 305 - CRUZE LITE - Chính hãng sử dụng vi xử lý gì?",
      // },
      // {
      //   text: "output: MediaTek MT6761 4 nhân (Helio A22). Theo dõi sản phẩm `664cdba350acbc37fcc45ca7`",
      // },
      // {
      //   text: "input: Điện thoại di dộng TCL 305 - CRUZE LITE - Chính hãng có khả năng mở khóa bằng vân tay?",
      // },
      // { text: "output: Có. Theo dõi sản phẩm `664cdba350acbc37fcc45ca7`" },
      // {
      //   text: "input: Điện thoại di dộng TCL 305 - CRUZE LITE - Chính hãng sản xuất ở đâu?",
      // },
      // {
      //   text: "output: Không có thông tin trong bộ dữ liệu. Theo dõi sản phẩm `664cdba350acbc37fcc45ca7`",
      // },
      // {
      //   text: "input: Giá của Nokia 5710 XpressAudio - Chính hãng là bao nhiêu?",
      // },
      // {
      //   text: "output: Giá của Nokia 5710 XpressAudio - Chính hãng là 1.690.000 VNĐ. Theo dõi sản phẩm `664cdba350acbc37fcc45ca8`",
      // },
      // {
      //   text: "input: Nokia 5710 XpressAudio - Chính hãng hỗ trợ bao nhiêu SIM?",
      // },
      // {
      //   text: "output: Điện thoại Nokia 5710 XpressAudio - Chính hãng hỗ trợ 2 SIM. Theo dõi sản phẩm `664cdba350acbc37fcc45ca8`",
      // },
      // {
      //   text: "input: Nokia 5710 XpressAudio - Chính hãng có sử dụng hệ điều hành nào?",
      // },
      // {
      //   text: "output: Điện thoại Nokia 5710 XpressAudio - Chính hãng sử dụng hệ điều hành S30+. Theo dõi sản phẩm `664cdba350acbc37fcc45ca8`",
      // },
      // {
      //   text: "input: Nokia 5710 XpressAudio - Chính hãng có kết nối mạng nào?",
      // },
      // {
      //   text: "output: Điện thoại Nokia 5710 XpressAudio - Chính hãng có hỗ trợ kết nối mạng 4G. Theo dõi sản phẩm `664cdba350acbc37fcc45ca8`",
      // },
      // {
      //   text: "input: Nokia 5710 XpressAudio - Chính hãng có dung lượng pin là bao nhiêu?",
      // },
      // {
      //   text: "output: Điện thoại Nokia 5710 XpressAudio - Chính hãng có viên pin dung lượng 1450mAh. Theo dõi sản phẩm `664cdba350acbc37fcc45ca8`",
      // },
      // {
      //   text: "input: Nokia 5710 XpressAudio - Chính hãng có camera mấy chấm?",
      // },
      // {
      //   text: "output: Điện thoại Nokia 5710 XpressAudio - Chính hãng chỉ có 1 camera ở mặt sau với độ phân giải 0.3MP. Theo dõi sản phẩm `664cdba350acbc37fcc45ca8`",
      // },
      // {
      //   text: "input: Nokia 5710 XpressAudio - Chính hãng có tính năng gì đặc biệt?",
      // },
      // {
      //   text: "output: Điện thoại Nokia 5710 XpressAudio - Chính hãng có tính năng đặc biệt là tích hợp cả một đôi tai nghe không dây True Wireless để đáp ứng nhu cầu nghe nhạc của người dùng. Theo dõi sản phẩm `664cdba350acbc37fcc45ca8`",
      // },
      // {
      //   text: "input: Nokia 5710 XpressAudio - Chính hãng có bao nhiêu màu sắc?",
      // },
      // {
      //   text: "output: Điện thoại Nokia 5710 XpressAudio - Chính hãng có 2 màu sắc là đen và trắng. Theo dõi sản phẩm `664cdba350acbc37fcc45ca8`",
      // },
      // {
      //   text: "input: Tai nghe tặng kèm Nokia 5710 XpressAudio - Chính hãng có thể sử dụng liên tục bao lâu?",
      // },
      // {
      //   text: "output: Tai nghe tặng kèm Nokia 5710 XpressAudio - Chính hãng có thể sử dụng để nghe nhạc liên tục trong 4 giờ. Theo dõi sản phẩm `664cdba350acbc37fcc45ca8`",
      // },
      // { text: "input: Nokia 105 4G - Chính hãng có giá bao nhiêu?" },
      // {
      //   text: "output: Giá của Nokia 105 4G - Chính hãng là 620,000đ. Theo dõi sản phẩm `664cdba350acbc37fcc45ca9`",
      // },
      // { text: "input: Nokia 105 4G - Chính hãng có những màu sắc nào?" },
      // {
      //   text: "output: Nokia 105 4G - Chính hãng có 2 màu sắc: Black và Blue. Theo dõi sản phẩm `664cdba350acbc37fcc45ca9`",
      // },
      // { text: "input: Nokia 105 4G - Chính hãng có những tính năng gì?" },
      // {
      //   text: "output: Nokia 105 4G - Chính hãng không có thông tin về tính năng cụ thể trong mô tả sản phẩm được cung cấp. Theo dõi sản phẩm `664cdba350acbc37fcc45ca9`",
      // },
      // {
      //   text: "input: Nokia 105 4G - Chính hãng có dung lượng pin là bao nhiêu?",
      // },
      // {
      //   text: "output: Nokia 105 4G - Chính hãng không có thông tin về dung lượng pin trong mô tả sản phẩm được cung cấp. Theo dõi sản phẩm `664cdba350acbc37fcc45ca9`",
      // },
      // { text: "input: Nokia 105 4G - Chính hãng có hỗ trợ kết nối 5G không?" },
      // {
      //   text: "output: Nokia 105 4G - Chính hãng chỉ hỗ trợ mạng 4G như tên gọi. Theo dõi sản phẩm `664cdba350acbc37fcc45ca9`",
      // },
      // { text: "input: Nokia 105 4G - Chính hãng có chế độ bảo hành nào?" },
      // {
      //   text: "output: Nokia 105 4G - Chính hãng không có thông tin về chế độ bảo hành trong mô tả sản phẩm được cung cấp. Theo dõi sản phẩm `664cdba350acbc37fcc45ca9`",
      // },
      // { text: "input: Nokia 105 4G - Chính hãng có các khuyến mãi nào?" },
      // {
      //   text: "output: Nokia 105 4G - Chính hãng không có thông tin về các chương trình khuyến mãi trong mô tả sản phẩm được cung cấp. Theo dõi sản phẩm `664cdba350acbc37fcc45ca9`",
      // },
      // { text: "input: Nokia 105 4G - Chính hãng có chip xử lý nào?" },
      // {
      //   text: "output: Nokia 105 4G - Chính hãng không có thông tin về chip xử lý trong mô tả sản phẩm được cung cấp. Theo dõi sản phẩm `664cdba350acbc37fcc45ca9`",
      // },
      // { text: "input: Nokia 105 4G - Chính hãng có camera không?" },
      // {
      //   text: "output: Nokia 105 4G - Chính hãng không có thông tin về camera trong mô tả sản phẩm được cung cấp. Theo dõi sản phẩm `664cdba350acbc37fcc45ca9`",
      // },
      // {
      //   text: "input: Nokia 105 4G - Chính hãng có màn hình kích thước bao nhiêu?",
      // },
      // {
      //   text: "output: Nokia 105 4G - Chính hãng không có thông tin về kích thước màn hình trong mô tả sản phẩm được cung cấp. Theo dõi sản phẩm `664cdba350acbc37fcc45ca9`",
      // },
      // { text: "input: Masstel Fami 60 4G có những chức năng nào?" },
      // {
      //   text: "output: + Masstel Fami 60 4G có chức năng báo động khẩn cấp, giúp người dùng dễ dàng báo cho người thân khi gặp trường hợp nào bất trắc chỉ qua một nút bấm.\nTheo dõi sản phẩm `664cdba350acbc37fcc45caa`",
      // },
      // { text: "input: Masstel Fami 60 4G có bao nhiêu màu sắc?" },
      // {
      //   text: "output: + Masstel Fami 60 4G có 2 màu sắc: Gold và Black.\nTheo dõi sản phẩm `664cdba350acbc37fcc45caa`",
      // },
      // { text: "input: Masstel Fami 60 4G sử dụng loại màn hình gì?" },
      // {
      //   text: "output: + Masstel Fami 60 4G sử dụng màn hình TFT LCD.\nTheo dõi sản phẩm `664cdba350acbc37fcc45caa`",
      // },
      // { text: "input: Masstel Fami 60 4G có hỗ trợ 4G không?" },
      // {
      //   text: "output: + Có, Masstel Fami 60 4G hỗ trợ 4G VoLTE.\nTheo dõi sản phẩm `664cdba350acbc37fcc45caa`",
      // },
      // { text: "input: Masstel Fami 60 4G có thời lượng pin là bao lâu?" },
      // {
      //   text: "output: + Masstel Fami 60 4G có thời lượng pin lên đến 17 ngày.\nTheo dõi sản phẩm `664cdba350acbc37fcc45caa`",
      // },
      // {
      //   text: "input: Masstel Fami 60 4G có dung lượng bộ nhớ trong là bao nhiêu?",
      // },
      // {
      //   text: "output: + Masstel Fami 60 4G có dung lượng bộ nhớ trong là 24MB.\nTheo dõi sản phẩm `664cdba350acbc37fcc45caa`",
      // },
      // { text: "input: Masstel Fami 60 4G có giá bao nhiêu?" },
      // {
      //   text: "output: + Giá của Masstel Fami 60 4G là 740.000 VNĐ.\nTheo dõi sản phẩm `664cdba350acbc37fcc45caa`",
      // },
      // { text: "input: Masstel Fami 60 4G sử dụng hệ điều hành gì?" },
      // {
      //   text: "output: + Masstel Fami 60 4G không có hệ điều hành.\nTheo dõi sản phẩm `664cdba350acbc37fcc45caa`",
      // },
      // { text: "input: Masstel Fami 60 4G có mấy khe cắm SIM?" },
      // {
      //   text: "output: + Masstel Fami 60 4G có 2 khe cắm SIM Nano.\nTheo dõi sản phẩm `664cdba350acbc37fcc45caa`",
      // },
      // { text: "input: Masstel Fami 60 4G có tích hợp đèn pin không?" },
      // {
      //   text: "output: + Có, Masstel Fami 60 4G tích hợp 2 đèn pin LED cực sáng.\nTheo dõi sản phẩm `664cdba350acbc37fcc45caa`",
      // },
      // {
      //   text: "input: Điện thoại di động Izi 10 4G - Chính hãng có những màu nào?",
      // },
      // {
      //   text: "output: + Điện thoại di động Izi 10 4G - Chính hãng có 3 màu sắc: đen - đỏ, đen và xanh dương. Theo dõi sản phẩm `664cdba350acbc37fcc45cab`",
      // },
      // {
      //   text: "input: Điện thoại di động Izi 10 4G - Chính hãng có hỗ trợ nghe đài FM không?",
      // },
      // {
      //   text: "output: + Điện thoại di động Izi 10 4G - Chính hãng có hỗ trợ nghe đài FM mà không cần tai nghe. Theo dõi sản phẩm `664cdba350acbc37fcc45cab`",
      // },
      // {
      //   text: "input: Điện thoại di động Izi 10 4G - Chính hãng có khe cắm thẻ nhớ không?",
      // },
      // {
      //   text: "output: + Điện thoại di động Izi 10 4G - Chính hãng có hỗ trợ khe cắm thẻ nhớ mở rộng lên đến 32GB. Theo dõi sản phẩm `664cdba350acbc37fcc45cab`",
      // },
      // {
      //   text: "input: Điện thoại di động Izi 10 4G - Chính hãng hỗ trợ tối đa bao nhiêu số liên lạc?",
      // },
      // {
      //   text: "output: + Điện thoại di động Izi 10 4G - Chính hãng có thể lưu trữ tối đa 2000 số điện thoại trong danh bạ. Theo dõi sản phẩm `664cdba350acbc37fcc45cab`",
      // },
      // {
      //   text: "input: Điện thoại di động Izi 10 4G - Chính hãng có hỗ trợ kết nối mạng nào?",
      // },
      // {
      //   text: "output: + Điện thoại di động Izi 10 4G - Chính hãng hỗ trợ kết nối mạng 4G với VoLTE. Theo dõi sản phẩm `664cdba350acbc37fcc45cab`",
      // },
      // {
      //   text: "input: Điện thoại di động Izi 10 4G - Chính hãng sử dụng loại màn hình nào?",
      // },
      // {
      //   text: "output: + Điện thoại di động Izi 10 4G - Chính hãng sử dụng màn hình TFT LCD. Theo dõi sản phẩm `664cdba350acbc37fcc45cab`",
      // },
      // {
      //   text: "input: Điện thoại di động Izi 10 4G - Chính hãng có hệ điều hành gì?",
      // },
      // {
      //   text: "output: + Điện thoại di động Izi 10 4G - Chính hãng không có hệ điều hành. Theo dõi sản phẩm `664cdba350acbc37fcc45cab`",
      // },
      // {
      //   text: "input: Điện thoại di động Izi 10 4G - Chính hãng sử dụng chip xử lý nào?",
      // },
      // {
      //   text: "output: + Điện thoại di động Izi 10 4G - Chính hãng sử dụng chip xử lý Unisoc UMS9117. Theo dõi sản phẩm `664cdba350acbc37fcc45cab`",
      // },
      // {
      //   text: "input: Điện thoại di động Izi 10 4G - Chính hãng có đèn pin không?",
      // },
      // {
      //   text: "output: + Điện thoại di động Izi 10 4G - Chính hãng có tích hợp đèn pin. Theo dõi sản phẩm `664cdba350acbc37fcc45cab`",
      // },
      // {
      //   text: "input: Điện thoại di động Izi 10 4G - Chính hãng có hỗ trợ 2 sim không?",
      // },
      // {
      //   text: "output: + Điện thoại di động Izi 10 4G - Chính hãng hỗ trợ 2 sim Nano. Theo dõi sản phẩm `664cdba350acbc37fcc45cab`",
      // },
      // {
      //   text: "input: Điện thoại di động Masstel Izi 15 - chính hãng có những màu sắc nào?",
      // },
      // {
      //   text: "output: Masstel Izi 15 có 3 màu sắc: Đen, Đỏ - Đen và Xanh lá Theo dõi sản phẩm `664cdba350acbc37fcc45cac`",
      // },
      // {
      //   text: "input: Điện thoại di động Masstel Izi 15 - chính hãng có màn hình kích thước bao nhiêu inch?",
      // },
      // {
      //   text: "output: Điện thoại di động Masstel Izi 15 có kích thước màn hình 1.77 inch Theo dõi sản phẩm `664cdba350acbc37fcc45cac`",
      // },
      // {
      //   text: "input: Điện thoại di động Masstel Izi 15 - chính hãng có khe cắm thẻ nhớ tối đa bao nhiêu GB?",
      // },
      // {
      //   text: "output: Điện thoại di động Masstel Izi 15 hỗ trợ khe cắm thẻ nhớ tối đa 128GB Theo dõi sản phẩm `664cdba350acbc37fcc45cac`",
      // },
      // {
      //   text: "input: Điện thoại di động Masstel Izi 15 - chính hãng có hỗ trợ chống nước không?",
      // },
      // {
      //   text: "output: Điện thoại di động Masstel Izi 15 không được đề cập đến khả năng chống nước trong thông số kỹ thuật Theo dõi sản phẩm `664cdba350acbc37fcc45cac`",
      // },
      // {
      //   text: "input: Điện thoại di động Masstel Izi 15 - chính hãng có bao nhiêu khe cắm SIM?",
      // },
      // {
      //   text: "output: Điện thoại di động Masstel Izi 15 có 2 khe cắm SIM nano Theo dõi sản phẩm `664cdba350acbc37fcc45cac`",
      // },
      // {
      //   text: "input: Điện thoại di động Masstel Izi 15 - chính hãng có hỗ trợ sạc nhanh không?",
      // },
      // {
      //   text: "output: Điện thoại di động Masstel Izi 15 không được đề cập đến khả năng sạc nhanh trong thông số kỹ thuật Theo dõi sản phẩm `664cdba350acbc37fcc45cac`",
      // },
      // {
      //   text: "input: Điện thoại di động Masstel Izi 15 - chính hãng có kết nối Bluetooth không?",
      // },
      // {
      //   text: "output: Điện thoại di động Masstel Izi 15 có kết nối Bluetooth 5.1 Theo dõi sản phẩm `664cdba350acbc37fcc45cac`",
      // },
      // {
      //   text: "input: Điện thoại di động Masstel Izi 15 - chính hãng có hỗ trợ kết nối 5G không?",
      // },
      // {
      //   text: "output: Điện thoại di động Masstel Izi 15 không hỗ trợ kết nối 5G Theo dõi sản phẩm `664cdba350acbc37fcc45cac`",
      // },
      // {
      //   text: "input: Điện thoại di động Masstel Izi 15 - chính hãng có thể nghe đài FM mà không cần cắm tai nghe không?",
      // },
      // {
      //   text: "output: Điện thoại di động Masstel Izi 15 có thể nghe đài FM mà không cần cắm tai nghe Theo dõi sản phẩm `664cdba350acbc37fcc45cac`",
      // },
      // { text: "input: Itel IT2590 có những ưu đãi nào không?" },
      // {
      //   text: "output: + Itel IT2590 có những ưu đãi sau: - TPBank EVO - Ưu đãi giảm 40% tối đa 400.000đ khi mở thẻ tín dụng TPBank EVO thành công. - Home PayLater - Trả góp qua Home PayLater giảm tới 1.000.000đ - VPBank - Mở thẻ VPBank, dùng Apple Pay, ưu đãi tới 1.250.000đ. - ZaloPay - Giảm 1% tối đa 300.000đ khi thanh toán qua ZaloPay. - VIB - Nhận Voucher 250.000đ khi mở thẻ tín dụng VIB thành công. - Kredivo - Ưu đãi tới 200.000đ khi mua trước trả sau qua Kredivo. - Tặng SIM Wintel (Áp dụng tại các chi nhánh độc lập với đơn hàng mua Điện thoại, Máy tính bảng, Đồng hồ hoặc các sản phẩm khác với hoá đơn trên 2.000.000đ). - Giảm thêm tới 1.000.000đ khi tham gia Thu cũ - Lên đời điện thoại Android - Giảm thêm 200.000đ cho tất các sản phẩm màn hình khi mua kèm Laptop, MacBook, Máy tính bảng và Điện thoại. Theo dõi sản phẩm `664cdba350acbc37fcc45cad`",
      // },
      // { text: "input: Itel IT2590 có những màu sắc nào?" },
      // {
      //   text: "output: + Itel IT2590 có 2 màu sắc là Đen và Xanh lam. Theo dõi sản phẩm `664cdba350acbc37fcc45cad`",
      // },
      // { text: "input: Itel IT2590 bao gồm những gì?" },
      // {
      //   text: "output: + Thông tin không được cung cấp trong dữ liệu được cung cấp. Theo dõi sản phẩm `664cdba350acbc37fcc45cad`",
      // },
      // { text: "input: Itel IT2590 có giá bao nhiêu?" },
      // {
      //   text: "output: + Itel IT2590 có giá 380.000 VNĐ. Theo dõi sản phẩm `664cdba350acbc37fcc45cad`",
      // },
      // { text: "input: Itel IT2590 có loại camera nào?" },
      // {
      //   text: "output: + Thông tin không được cung cấp trong dữ liệu được cung cấp. Theo dõi sản phẩm `664cdba350acbc37fcc45cad`",
      // },
      // { text: "input: Itel IT2590 có những tính năng nào?" },
      // {
      //   text: "output: + Thông tin không được cung cấp trong dữ liệu được cung cấp. Theo dõi sản phẩm `664cdba350acbc37fcc45cad`",
      // },
      // { text: "input: Itel IT2590 có dung lượng pin bao nhiêu?" },
      // {
      //   text: "output: + Thông tin không được cung cấp trong dữ liệu được cung cấp. Theo dõi sản phẩm `664cdba350acbc37fcc45cad`",
      // },
      // { text: "input: Itel IT2590 có hỗ trợ 4G không?" },
      // {
      //   text: "output: + Thông tin không được cung cấp trong dữ liệu được cung cấp. Theo dõi sản phẩm `664cdba350acbc37fcc45cad`",
      // },
      // { text: "input: Itel IT2590 có bộ nhớ RAM bao nhiêu?" },
      // {
      //   text: "output: + Thông tin không được cung cấp trong dữ liệu được cung cấp. Theo dõi sản phẩm `664cdba350acbc37fcc45cad`",
      // },
      // { text: "input: Itel IT2590 có hệ điều hành gì?" },
      // {
      //   text: "output: + Thông tin không được cung cấp trong dữ liệu được cung cấp. Theo dõi sản phẩm `664cdba350acbc37fcc45cad`",
      // },
      // { text: "input: ITEL 9210 4G - Chính hãng có dung lượng pin bao nhiêu?" },
      // {
      //   text: "output: + ITEL 9210 4G - Chính hãng có dung lượng pin là 1900 mAh. Theo dõi sản phẩm ` item.id `",
      // },
      // { text: "input: ITEL 9210 4G - Chính hãng có hệ điều hành gì?" },
      // {
      //   text: "output: + ITEL 9210 4G - Chính hãng không có hệ điều hành. Theo dõi sản phẩm `664cdba350acbc37fcc45cae`",
      // },
      // { text: "input: ITEL 9210 4G - Chính hãng có bộ nhớ trong bao nhiêu?" },
      // {
      //   text: "output: + ITEL 9210 4G - Chính hãng có bộ nhớ trong là 128MB. Theo dõi sản phẩm ` item.id `",
      // },
      // { text: "input: ITEL 9210 4G - Chính hãng có những màu sắc nào?" },
      // {
      //   text: "output: + ITEL 9210 4G - Chính hãng có 2 màu sắc: Xanh Dương và Màu Đen. Theo dõi sản phẩm `664cdba350acbc37fcc45cae`",
      // },
      // { text: "input: ITEL 9210 4G - Chính hãng có hỗ trợ 4G không?" },
      // {
      //   text: "output: + Có, ITEL 9210 4G - Chính hãng hỗ trợ 4G. Theo dõi sản phẩm ` item.id `",
      // },
      // { text: "input: ITEL 9210 4G - Chính hãng có giá bao nhiêu?" },
      // {
      //   text: "output: + ITEL 9210 4G - Chính hãng có giá là 650.000 VNĐ. Theo dõi sản phẩm `664cdba350acbc37fcc45cae`",
      // },
      // {
      //   text: "input: ITEL 9210 4G - Chính hãng có camera bao nhiêu Megapixel?",
      // },
      // {
      //   text: "output: + ITEL 9210 4G - Chính hãng có camera 0.3 MP. Theo dõi sản phẩm ` item.id `",
      // },
      // {
      //   text: "input: ITEL 9210 4G - Chính hãng có hỗ trợ thẻ nhớ ngoài không?",
      // },
      // {
      //   text: "output: + Không có thông tin về việc hỗ trợ thẻ nhớ ngoài của ITEL 9210 4G - Chính hãng trong dữ liệu được cung cấp. Theo dõi sản phẩm `664cdba350acbc37fcc45cae`",
      // },
      // {
      //   text: "input: ITEL 9210 4G - Chính hãng có màn hình kích thước bao nhiêu?",
      // },
      // {
      //   text: 'output: + ITEL 9210 4G - Chính hãng có màn hình kích thước 2.4". Theo dõi sản phẩm ` item.id `',
      // },
      // { text: "input: ITEL 9210 4G - Chính hãng có những ưu đãi gì?" },
      // {
      //   text: "output: + ITEL 9210 4G - Chính hãng có các ưu đãi sau: - TPBank EVO - Ưu đãi giảm 40% tối đa 400.000đ khi mở thẻ tín dụng TPBank EVO thành công. - Home PayLater - Trả góp qua Home PayLater giảm tới 1.000.000đ - VPBank - Mở thẻ VPBank, dùng Apple Pay, ưu đãi tới 1.250.000đ. - ZaloPay - Giảm 1% tối đa 300.000đ khi thanh toán qua ZaloPay. - VIB - Nhận Voucher 250.000đ khi mở thẻ tín dụng VIB thành công. - Kredivo - Ưu đãi tới 200.000đ khi mua trước trả sau qua Kredivo. - Tặng SIM Wintel (Áp dụng tại các chi nhánh độc lập với đơn hàng mua Điện thoại, Máy tính bảng, Đồng hồ hoặc các sản phẩm khác với hoá đơn trên 2.000.000đ). - Giảm thêm tới 1.000.000đ khi tham gia Thu cũ - Lên đời điện thoại Android - Giảm thêm 200.000đ cho tất các sản phẩm màn hình khi mua kèm Laptop, MacBook, Máy tính bảng và Điện thoại. Theo dõi sản phẩm `664cdba350acbc37fcc45cae`",
      // },
      // { text: "input: Điện thoại di động Masstel Fami 12 4G có những màu gì?" },
      // {
      //   text: "output: + Màu đen, Navy, Gold Theo dõi sản phẩm `664cdba350acbc37fcc45caf`",
      // },
      // { text: "input: Masstel Fami 12 4G có dung lượng pin bao nhiêu?" },
      // {
      //   text: "output: + 1400mAh Theo dõi sản phẩm `664cdba350acbc37fcc45caf`",
      // },
      // { text: "input: Masstel Fami 12 4G có thể kết nối với mạng nào?" },
      // { text: "output: + 4G Theo dõi sản phẩm `664cdba350acbc37fcc45caf`" },
      // {
      //   text: "input: Masstel Fami 12 4G có thể lưu trữ tối đa bao nhiêu số danh bạ?",
      // },
      // { text: "output: + 500 số Theo dõi sản phẩm `664cdba350acbc37fcc45caf`" },
      // { text: "input: Masstel Fami 12 4G có khe cắm thẻ nhớ không?" },
      // { text: "output: + Có Theo dõi sản phẩm `664cdba350acbc37fcc45caf`" },
      // {
      //   text: "input: Điện thoại di động Masstel Fami 12 4G có thể chạy liên tục trong bao lâu?",
      // },
      // { text: "output: + 5 giờ Theo dõi sản phẩm `664cdba350acbc37fcc45caf`" },
      // {
      //   text: "input: Điện thoại di động Masstel Fami 12 4G hỗ trợ tính năng bắt sóng FM hay không?",
      // },
      // { text: "output: + Có Theo dõi sản phẩm `664cdba350acbc37fcc45caf`" },
      // {
      //   text: "input: Chiếc điện thoại di động Masstel Fami 12 4G có trọng lượng là bao nhiêu?",
      // },
      // {
      //   text: "output: + 124 gram Theo dõi sản phẩm `664cdba350acbc37fcc45caf`",
      // },
      // {
      //   text: "input: Masstel Fami 12 4G được bảo hành trong thời gian bao lâu?",
      // },
      // {
      //   text: "output: + 12 tháng Theo dõi sản phẩm `664cdba350acbc37fcc45caf`",
      // },
      // {
      //   text: "input: Masstel Fami 12 4G có kích thước màn hình là bao nhiêu?",
      // },
      // {
      //   text: "output: + 1.77 inch Theo dõi sản phẩm `664cdba350acbc37fcc45caf`",
      // },
      // {
      //   text: "input: Điện thoại di động Nokia 110 4G - Chính hãng có giá bao nhiêu?",
      // },
      // {
      //   text: "output: Giá của Điện thoại di động Nokia 110 4G - Chính hãng là 640.000 VNĐ. Theo dõi sản phẩm `664cdba350acbc37fcc45cb0`",
      // },
      // {
      //   text: "input: Điện thoại di động Nokia 110 4G - Chính hãng có những loại màu nào?",
      // },
      // {
      //   text: "output: Điện thoại di động Nokia 110 4G - Chính hãng có 2 loại màu: Xanh dương và Đen. Theo dõi sản phẩm `664cdba350acbc37fcc45cb0`",
      // },
      // {
      //   text: "input: Điện thoại di động Nokia 110 4G - Chính hãng thuộc danh mục nào?",
      // },
      // {
      //   text: "output: Điện thoại di động Nokia 110 4G - Chính hãng thuộc danh mục: Điện thoại, Nokia, Nokia cục gạch. Theo dõi sản phẩm `664cdba350acbc37fcc45cb0`",
      // },
      // {
      //   text: "input: Có những ưu đãi nào khi mua Điện thoại di động Nokia 110 4G - Chính hãng?",
      // },
      // {
      //   text: "output: Khi mua Điện thoại di động Nokia 110 4G - Chính hãng, bạn sẽ được hưởng các ưu đãi sau:\n\n- TPBank EVO - Ưu đãi giảm 40% tối đa 400.000đ khi mở thẻ tín dụng TPBank EVO thành công.\n- Home PayLater - Trả góp qua Home PayLater giảm tới 1.000.000đ\n- VPBank - Mở thẻ VPBank, dùng Apple Pay, ưu đãi tới 1.250.000đ.\n- ZaloPay - Giảm 1% tối đa 300.000đ khi thanh toán qua ZaloPay.\n- VIB - Nhận Voucher 250.000đ khi mở thẻ tín dụng VIB thành công.\n- Kredivo - Ưu đãi tới 200.000đ khi mua trước trả sau qua Kredivo.\n- Tặng SIM Wintel (Áp dụng tại các chi nhánh độc lập với đơn hàng mua Điện thoại, Máy tính bảng, Đồng hồ hoặc các sản phẩm khác với hoá đơn trên 2.000.000đ).\n- Giảm thêm tới 1.000.000đ khi tham gia Thu cũ - Lên đời điện thoại Android\n- Giảm thêm 200.000đ cho tất các sản phẩm màn hình khi mua kèm Laptop, MacBook, Máy tính bảng và Điện thoại.\nTheo dõi sản phẩm `664cdba350acbc37fcc45cb0`",
      // },
      // {
      //   text: "input: Có những bài viết liên quan nào về Điện thoại di động Nokia 110 4G - Chính hãng?",
      // },
      // {
      //   text: "output: Có những bài viết liên quan sau về Điện thoại di động Nokia 110 4G - Chính hãng:\n\n- Bộ đôi “điện thoại cục gạch” Nokia 130 (2017) và Nokia 105 (2017) chính thức trình làng\n- Ngay sau trái chuối Nokia 8110, một chiếc điện thoại Nokia “cục gạch” mới chuẩn bị hồi sinh\n- Nokia sắp ra mắt bộ 3 “bàn phím”: Nokia 106 (2023), Nokia 105 và 110\nTheo dõi sản phẩm `664cdba350acbc37fcc45cb0`",
      // },
      // {
      //   text: "input: Điện thoại di động Nokia 110 4G - Chính hãng có những thông số kỹ thuật nào?",
      // },
      // {
      //   text: "output: Thông số kỹ thuật của Điện thoại di động Nokia 110 4G - Chính hãng hiện chưa được cung cấp. Theo dõi sản phẩm `664cdba350acbc37fcc45cb0`",
      // },
      // {
      //   text: "input: Điện thoại di động Nokia 110 4G - Chính hãng có những hình ảnh nào?",
      // },
      // {
      //   text: "output: Có 4 hình ảnh được cung cấp cho Điện thoại di động Nokia 110 4G - Chính hãng:\n\n- https://cdn.hoanghamobile.com/i/productlist/dst/Uploads/2021/07/10/image-removebg-preview-8.png\n- https://cdn.hoanghamobile.com/i/productlist/dst/Uploads/2021/07/10/image-removebg-preview-6.png\n- https://cdn.hoanghamobile.com/i/productlist/dst/Uploads/2021/07/10/image-removebg-preview-7.png\n- https://cdn.hoanghamobile.com/i/productlist/dst/Uploads/2021/07/10/image-removebg-preview-5.png\nTheo dõi sản phẩm `664cdba350acbc37fcc45cb0`",
      // },
      // {
      //   text: "input: Điện thoại di động Nokia 110 4G - Chính hãng có những sản phẩm tương tự nào?",
      // },
      // {
      //   text: "output: Có 5 sản phẩm tương tự Điện thoại di động Nokia 110 4G - Chính hãng:\n\n- Nokia 105 4G - Chính hãng\n- Điện thoại di động Masstel Fami 12 4G - Chính hãng\n- ITEL 9210 4G - Chính hãng\n- Điện thoại di động Izi 10 4G - Chính hãng\n- Điện thoại di động Masstel Fami 60 4G - Chính hãng\nTheo dõi sản phẩm `664cdba350acbc37fcc45cb0`",
      // },
      // {
      //   text: "input: Điện thoại di động Nokia 110 4G - Chính hãng có điểm đánh giá bao nhiêu?",
      // },
      // {
      //   text: "output: Điện thoại di động Nokia 110 4G - Chính hãng hiện chưa có điểm đánh giá. Theo dõi sản phẩm `664cdba350acbc37fcc45cb0`",
      // },
      // {
      //   text: "input: Điện thoại di động Nokia 110 4G - Chính hãng có những bài đánh giá nào?",
      // },
      // {
      //   text: "output: Điện thoại di động Nokia 110 4G - Chính hãng hiện chưa có bài đánh giá nào. Theo dõi sản phẩm `664cdba350acbc37fcc45cb0`",
      // },
      // { text: "input: Nokia 110 Pro có giá bao nhiêu?" },
      // {
      //   text: "output: + Giá của Nokia 110 Pro là 670,000. Theo dõi sản phẩm `664cdba350acbc37fcc45cb1`",
      // },
      // { text: "input: Nokia 110 Pro có những màu nào?" },
      // {
      //   text: "output: + Nokia 110 Pro có 2 màu: Xanh than và tím. Theo dõi sản phẩm `664cdba350acbc37fcc45cb1`",
      // },
      // { text: "input: Nokia 110 Pro có những tính năng nào?" },
      // {
      //   text: "output: + Nokia 110 Pro có những tính năng như nghe nhạc, đài FM, kết nối thẻ nhớ, trình duyệt web và Bluetooth 5.0. Theo dõi sản phẩm `664cdba350acbc37fcc45cb1`",
      // },
      // { text: "input: Phần mềm Nokia 110 Pro là gì?" },
      // {
      //   text: "output: + Nokia 110 Pro sử dụng hệ điều hành S30+. Theo dõi sản phẩm `664cdba350acbc37fcc45cb1`",
      // },
      // { text: "input: Nokia 110 Pro có hỗ trợ 2 sim không?" },
      // {
      //   text: "output: + Có, Nokia 110 Pro hỗ trợ 2 sim nano. Theo dõi sản phẩm `664cdba350acbc37fcc45cb1`",
      // },
      // { text: "input: Chụp ảnh trên Nokia 110 Pro như thế nào?" },
      // {
      //   text: "output: + Nokia 110 Pro không có camera nên không chụp ảnh được. Theo dõi sản phẩm `664cdba350acbc37fcc45cb1`",
      // },
      // { text: "input: Nokia 110 Pro có lắp sim 4G không?" },
      // {
      //   text: "output: + Có, Nokia 110 Pro hỗ trợ lắp sim 4G. Theo dõi sản phẩm `664cdba350acbc37fcc45cb1`",
      // },
      // { text: "input: Nokia 110 Pro có cấu hình mạnh không?" },
      // {
      //   text: "output: + Nokia 110 Pro có cấu hình đủ đáp ứng các tác vụ cơ bản như nghe gọi, nhắn tin, nghe nhạc... Theo dõi sản phẩm `664cdba350acbc37fcc45cb1`",
      // },
      // { text: "input: Nokia 110 Pro màu nào đẹp?" },
      // {
      //   text: "output: + Đây là câu hỏi mang tính chủ quan tùy theo sở thích mỗi người. Theo dõi sản phẩm `664cdba350acbc37fcc45cb1`",
      // },
      // { text: "input: Nokia 110 Pro có nghe nhạc được không?" },
      // {
      //   text: "output: + Có, Nokia 110 Pro có thể nghe nhạc với trình nghe nhạc tích hợp. Theo dõi sản phẩm `664cdba350acbc37fcc45cb1`",
      // },
      // { text: "input: Nokia 105 4G Pro - Chính hãng có giá bao nhiêu?" },
      // {
      //   text: "output: Giá của Nokia 105 4G Pro - Chính hãng là 640.000 VNĐ. Theo dõi sản phẩm `664cdba350acbc37fcc45cb2`",
      // },
      // { text: "input: Nokia 105 4G Pro - Chính hãng có những màu sắc nào?" },
      // {
      //   text: "output: Nokia 105 4G Pro - Chính hãng có 2 màu sắc: Xanh và Đen. Theo dõi sản phẩm `664cdba350acbc37fcc45cb2`",
      // },
      // { text: "input: Nokia 105 4G Pro - Chính hãng hỗ trợ loại thẻ sim nào?" },
      // {
      //   text: "output: Nokia 105 4G Pro - Chính hãng hỗ trợ thẻ sim loại nano SIM. Theo dõi sản phẩm `664cdba350acbc37fcc45cb2`",
      // },
      // {
      //   text: "input: Nokia 105 4G Pro - Chính hãng có dung lượng pin là bao nhiêu?",
      // },
      // {
      //   text: "output: Nokia 105 4G Pro - Chính hãng có dung lượng pin là 1450 mAh. Theo dõi sản phẩm `664cdba350acbc37fcc45cb2`",
      // },
      // { text: "input: Nokia 105 4G Pro - Chính hãng có mấy khe cắm thẻ sim?" },
      // {
      //   text: "output: Nokia 105 4G Pro - Chính hãng có 2 khe cắm thẻ sim. Theo dõi sản phẩm `664cdba350acbc37fcc45cb2`",
      // },
      // {
      //   text: "input: Nokia 105 4G Pro - Chính hãng sử dụng hệ điều hành nào?",
      // },
      // {
      //   text: "output: Nokia 105 4G Pro - Chính hãng sử dụng hệ điều hành S30+. Theo dõi sản phẩm `664cdba350acbc37fcc45cb2`",
      // },
      // {
      //   text: "input: Nokia 105 4G Pro - Chính hãng hỗ trợ các chế độ mạng nào?",
      // },
      // {
      //   text: "output: Nokia 105 4G Pro - Chính hãng hỗ trợ các chế độ mạng 2G, 3G, 4G, Hỗ trợ VoLTE. Theo dõi sản phẩm `664cdba350acbc37fcc45cb2`",
      // },
      // {
      //   text: "input: Nokia 105 4G Pro - Chính hãng có hỗ trợ khe cắm thẻ nhớ không?",
      // },
      // {
      //   text: "output: Nokia 105 4G Pro - Chính hãng có hỗ trợ khe cắm thẻ nhớ loại MicroSD lên tới 32GB. Theo dõi sản phẩm `664cdba350acbc37fcc45cb2`",
      // },
      // {
      //   text: "input: Nokia 105 4G Pro - Chính hãng có chế độ bảo hành là bao lâu?",
      // },
      // {
      //   text: "output: Nokia 105 4G Pro - Chính hãng có chế độ bảo hành chính hãng 12 tháng. Theo dõi sản phẩm `664cdba350acbc37fcc45cb2`",
      // },
      // {
      //   text: "input: Nokia 105 4G Pro - Chính hãng có thể cài đặt ứng dụng không?",
      // },
      // {
      //   text: "output: Nokia 105 4G Pro - Chính hãng không hỗ trợ cài đặt ứng dụng. Theo dõi sản phẩm `664cdba350acbc37fcc45cb2`",
      // },
      // { text: "input: Itel Vision 1 Pro 3GB/32G có bao nhiêu màu sắc?" },
      // {
      //   text: "output: + Itel Vision 1 Pro 3GB/32G có 3 màu sắc: Xanh ngọc lam, Màu Đen, Xanh. Theo dõi sản phẩm `664cdba350acbc37fcc45cb3`",
      // },
      // {
      //   text: "input: Itel Vision 1 Pro 3GB/32G có kích thước màn hình bao nhiêu?",
      // },
      // {
      //   text: 'output: + Itel Vision 1 Pro 3GB/32G có kích thước màn hình 6.52". Theo dõi sản phẩm `664cdba350acbc37fcc45cb3`',
      // },
      // { text: "input: Itel Vision 1 Pro 3GB/32G có hỗ trợ mạng 4G không?" },
      // {
      //   text: "output: + Có, Itel Vision 1 Pro 3GB/32G hỗ trợ mạng 4G. Theo dõi sản phẩm `664cdba350acbc37fcc45cb3`",
      // },
      // { text: "input: Itel Vision 1 Pro 3GB/32G trang bị loại pin nào?" },
      // {
      //   text: "output: + Itel Vision 1 Pro 3GB/32G trang bị pin 4000mAh. Theo dõi sản phẩm `664cdba350acbc37fcc45cb3`",
      // },
      // {
      //   text: "input: Itel Vision 1 Pro 3GB/32G có camera sau độ phân giải bao nhiêu?",
      // },
      // {
      //   text: "output: + Itel Vision 1 Pro 3GB/32G có camera sau độ phân giải 8MP. Theo dõi sản phẩm `664cdba350acbc37fcc45cb3`",
      // },
      // {
      //   text: "input: Itel Vision 1 Pro 3GB/32G có camera trước độ phân giải bao nhiêu?",
      // },
      // {
      //   text: "output: + Itel Vision 1 Pro 3GB/32G có camera trước độ phân giải 5MP. Theo dõi sản phẩm `664cdba350acbc37fcc45cb3`",
      // },
      // {
      //   text: "input: Itel Vision 1 Pro 3GB/32G có hỗ trợ mở rộng dung lượng bộ nhớ không?",
      // },
      // {
      //   text: "output: + Có, Itel Vision 1 Pro 3GB/32G hỗ trợ mở rộng dung lượng bộ nhớ qua thẻ nhớ ngoài MicroSD tối đa 128GB. Theo dõi sản phẩm `664cdba350acbc37fcc45cb3`",
      // },
      // {
      //   text: "input: Itel Vision 1 Pro 3GB/32G có những tính năng bảo mật nào?",
      // },
      // {
      //   text: "output: + Itel Vision 1 Pro 3GB/32G có 2 tính năng bảo mật là vân tay và nhận diện khuôn mặt. Theo dõi sản phẩm `664cdba350acbc37fcc45cb3`",
      // },
      // { text: "input: Itel Vision 1 Pro 3GB/32G bao nhiêu pixel?" },
      // {
      //   text: "output: + Itel Vision 1 Pro 3GB/32G có độ phân giải HD+ (720 x 1600 Pixels). Theo dõi sản phẩm `664cdba350acbc37fcc45cb3`",
      // },
      // { text: "input: Itel Vision 1 Pro 3GB/32G dùng hệ điều hành gì?" },
      // {
      //   text: "output: + Itel Vision 1 Pro 3GB/32G sử dụng hệ điều hành Android 10 (Go Edition). Theo dõi sản phẩm `664cdba350acbc37fcc45cb3`",
      // },
      // { text: "input: Nokia C20 - Chính hãng có hỗ trợ 4G không?" },
      // {
      //   text: "output: + Có, Nokia C20 - Chính hãng hỗ trợ 4G. Theo dõi sản phẩm `664cdba350acbc37fcc45cb4`",
      // },
      // {
      //   text: "input: Dung lượng pin của Nokia C20 - Chính hãng là bao nhiêu?",
      // },
      // {
      //   text: "output: + Dung lượng pin của Nokia C20 - Chính hãng là 2950 mAh. Theo dõi sản phẩm `664cdba350acbc37fcc45cb4`",
      // },
      // { text: "input: Nokia C20 - Chính hãng có những màu sắc nào?" },
      // {
      //   text: "output: + Nokia C20 - Chính hãng có 2 màu sắc: Vàng phù sa và Xanh thiên thạch. Theo dõi sản phẩm `664cdba350acbc37fcc45cb4`",
      // },
      // { text: "input: Nokia C20 - Chính hãng có hệ điều hành là gì?" },
      // {
      //   text: "output: + Nokia C20 - Chính hãng sử dụng hệ điều hành Android 11 (Go Edition). Theo dõi sản phẩm `664cdba350acbc37fcc45cb4`",
      // },
      // {
      //   text: "input: Nokia C20 - Chính hãng có camera sau bao nhiêu megapixel?",
      // },
      // {
      //   text: "output: + Camera sau của Nokia C20 - Chính hãng có độ phân giải 5MP. Theo dõi sản phẩm `664cdba350acbc37fcc45cb4`",
      // },
      // { text: "input: Bộ nhớ trong của Nokia C20 - Chính hãng là bao nhiêu?" },
      // {
      //   text: "output: + Bộ nhớ trong của Nokia C20 - Chính hãng là 32GB. Theo dõi sản phẩm `664cdba350acbc37fcc45cb4`",
      // },
      // { text: "input: Nokia C20 - Chính hãng hỗ trợ 2 khe SIM nào?" },
      // {
      //   text: "output: + Nokia C20 - Chính hãng hỗ trợ 2 Nano SIM. Theo dõi sản phẩm `664cdba350acbc37fcc45cb4`",
      // },
      // { text: "input: Nokia C20 - Chính hãng có màn hình bao nhiêu inch?" },
      // {
      //   text: "output: + Nokia C20 - Chính hãng có màn hình 6,52 inch. Theo dõi sản phẩm `664cdba350acbc37fcc45cb4`",
      // },
      // { text: "input: Nokia C20 - Chính hãng có hỗ trợ trả góp không?" },
      // {
      //   text: "output: + Có, Nokia C20 - Chính hãng có hỗ trợ các hình thức trả góp qua Home PayLater, VPBank, ZaloPay, VIB, Kredivo. Theo dõi sản phẩm `664cdba350acbc37fcc45cb4`",
      // },
      // {
      //   text: "input: Nokia C20 - Chính hãng có hỗ trợ mở rộng bảo hành không?",
      // },
      // {
      //   text: "output: + Không có thông tin về chương trình mở rộng bảo hành cho sản phẩm Nokia C20 - Chính hãng. Theo dõi sản phẩm `664cdba350acbc37fcc45cb4`",
      // },
      // { text: "input: Realme C30s 3GB/64GB có bao nhiêu màu sắc?" },
      // {
      //   text: "output: + Có 2 màu sắc: Xanh Hồ và Đen Nhám. + Theo dõi sản phẩm `664cdba350acbc37fcc45cb5`",
      // },
      // { text: "input: Realme C30s 3GB/64GB có dung lượng pin là bao nhiêu?" },
      // {
      //   text: "output: + 5000mAh + Theo dõi sản phẩm `664cdba350acbc37fcc45cb5`",
      // },
      // {
      //   text: "input: Realme C30s 3GB/64GB có kích thước màn hình là bao nhiêu?",
      // },
      // {
      //   text: "output: + 6.5 inch + Theo dõi sản phẩm `664cdba350acbc37fcc45cb5`",
      // },
      // {
      //   text: "input: Realme C30s 3GB/64GB có độ phân giải màn hình là bao nhiêu?",
      // },
      // {
      //   text: "output: + HD+ 720*1600 + Theo dõi sản phẩm `664cdba350acbc37fcc45cb5`",
      // },
      // {
      //   text: "input: Realme C30s 3GB/64GB có camera chính độ phân giải là bao nhiêu?",
      // },
      // { text: "output: + 8MP + Theo dõi sản phẩm `664cdba350acbc37fcc45cb5`" },
      // {
      //   text: "input: Realme C30s 3GB/64GB có camera selfie độ phân giải là bao nhiêu?",
      // },
      // { text: "output: + 5MP + Theo dõi sản phẩm `664cdba350acbc37fcc45cb5`" },
      // { text: "input: Realme C30s 3GB/64GB hỗ trợ mở khóa vân tay không?" },
      // { text: "output: + Có + Theo dõi sản phẩm `664cdba350acbc37fcc45cb5`" },
      // { text: "input: Realme C30s 3GB/64GB sử dụng loại màn hình nào?" },
      // {
      //   text: "output: + IPS LCD + Theo dõi sản phẩm `664cdba350acbc37fcc45cb5`",
      // },
      // { text: "input: Realme C30s 3GB/64GB hỗ trợ sạc nhanh không?" },
      // {
      //   text: "output: + Không có thông tin + Theo dõi sản phẩm `664cdba350acbc37fcc45cb5`",
      // },
      // { text: "input: Realme C30s 3GB/64GB có vi xử lý gì?" },
      // {
      //   text: "output: + Unisoc SC9863A1 + Theo dõi sản phẩm `664cdba350acbc37fcc45cb5`",
      // },
      // { text: "input: Realme C33 3GB/32GB có màu gì?" },
      // {
      //   text: "output: + Realme C33 3GB/32GB có 3 màu: Vàng cát, Xanh nước biển và Biển đêm. Theo dõi sản phẩm `664cdba350acbc37fcc45cb6`",
      // },
      // { text: "input: Realme C33 3GB/32GB có mấy camera?" },
      // {
      //   text: "output: + Realme C33 3GB/32GB có 2 camera sau và 1 camera trước. Theo dõi sản phẩm `664cdba350acbc37fcc45cb6`",
      // },
      // { text: "input: Realme C33 3GB/32GB chạy hệ điều hành gì?" },
      // {
      //   text: "output: + Realme C33 3GB/32GB chạy trên Android 12 ngay khi xuất xưởng. Theo dõi sản phẩm `664cdba350acbc37fcc45cb6`",
      // },
      // { text: "input: Realme C33 3GB/32GB có giá bao nhiêu?" },
      // {
      //   text: "output: + Giá của Realme C33 3GB/32GB là 2.290.000 VNĐ. Theo dõi sản phẩm `664cdba350acbc37fcc45cb6`",
      // },
      // { text: "input: Realme C33 3GB/32GB có dung lượng pin là bao nhiêu?" },
      // {
      //   text: "output: + Realme C33 3GB/32GB có dung lượng pin là 5.000mAh. Theo dõi sản phẩm `664cdba350acbc37fcc45cb6`",
      // },
      // { text: "input: Realme C33 3GB/32GB có hỗ trợ 5G không?" },
      // {
      //   text: "output: + Không, Realme C33 3GB/32GB không hỗ trợ 5G. Theo dõi sản phẩm `664cdba350acbc37fcc45cb6`",
      // },
      // { text: "input: Realme C33 3GB/32GB có mấy khe cắm SIM?" },
      // {
      //   text: "output: + Realme C33 3GB/32GB có 2 khe cắm SIM. Theo dõi sản phẩm `664cdba350acbc37fcc45cb6`",
      // },
      // {
      //   text: "input: Realme C33 3GB/32GB có tốc độ làm tươi màn hình là bao nhiêu?",
      // },
      // {
      //   text: "output: + Realme C33 3GB/32GB có tốc độ làm tươi màn hình là 60Hz. Theo dõi sản phẩm `664cdba350acbc37fcc45cb6`",
      // },
      // { text: "input: Realme C33 3GB/32GB có hỗ trợ sạc nhanh không?" },
      // {
      //   text: "output: + Không, Realme C33 3GB/32GB không hỗ trợ sạc nhanh. Theo dõi sản phẩm `664cdba350acbc37fcc45cb6`",
      // },
      { text: `input: ${prompt}` },
      { text: "output: " },
    ];

    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
        safetySettings,
      });
      const response = result.response;

      await Message.create({
        user: req.user._id,
        typeUser: "bot",
        typeMessage: "text",
        content: response?.text(),
        startTime: moment().format("DD-MM-YYYY HH:mm:ss"),
      });

      res.json(response);
    } catch (e) {
      console.log(e);

      await Message.create({
        user: req.user._id,
        typeUser: "bot",
        typeMessage: "text",
        content: "...",
        startTime: moment().format("DD-MM-YYYY HH:mm:ss"),
      });

      res.json({});
    }
  });

  //  [ GET - ROUTE: api/user/]
  getMessage = asyncHandler(async (req, res) => {
    const message = await Message.find({ user: req.user._id });
    if (message) {
      res.json(message);
    } else {
      res.status(404);
      throw new Error("User does not exist!");
    }
  });
}

module.exports = new MessageController();
