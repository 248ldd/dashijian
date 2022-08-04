function getUserInfo() {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    data: null,
    success: (res) => {
      const { stutas, message } = res;
      // if (stutas !== 0) return layer.msg(message);
      renderAvater(res.data);
    },
  });
}
const renderAvater = (data) => {
  let name = data.nickname || data.username;
  $("#welcome").html("欢迎" + name);
  if (data.user_pic !== null) {
    $(".layui-nav-img").attr("src", data.user_pic);
    $(".text-avatar").hide();
  } else {
    $(".layui-nav-img").hide();
    let firstName = name[0].toUpperCase();
    $(".text-avatar").html(firstName);
  }
};
getUserInfo();

$("#exitBtn").on("click", function () {
  layer.confirm("确定退出吗?", { icon: 3, title: "提示" }, function (index) {
    //do something
    location.href = "/login.html";
    localStorage.removeItem("token");
    layer.close(index);
  });
});
