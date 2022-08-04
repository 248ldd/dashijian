// 1.1 获取裁剪区域的 DOM 元素
var $image = $("#image");
// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: ".img-preview",
};

// 1.3 创建裁剪区域
$image.cropper(options);
const layer = layui.layer;
$("#uploadBtn").click(function () {
  $("#file").click();
});

$("#file").change(function (e) {
  let files = e.target.files;
  if (files.length === 0) return layer.msg("请选择需要上传的图片");
  let file = files[0];
  let imgUrl = URL.createObjectURL(file);
  $image.cropper("destroy").attr("src", imgUrl).cropper(options);
});

$("#sendBtn").click(function () {
  const dataURL = $image
    .cropper("getCroppedCanvas", {
      // 创建一个 Canvas 画布
      width: 100,
      height: 100,
    })
    .toDataURL("image/png");
  // 2、发送 ajax 请求，发送到服务器
  $.ajax({
    method: "POST",
    url: "/my/update/avatar",
    data: {
      avatar: dataURL,
    },
    success: function (res) {
      if (res.status !== 0) window.parent.getUserInfo();
    },
  });
});
