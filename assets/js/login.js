// 点击去注册让注册盒子出现 登陆盒子隐藏
$("#link_reg").on("click", () => {
  $(".login-box").hide();
  $(".reg-box").show();
});
// 点击去登陆让登陆盒子出现 注册盒子隐藏
$("#link_login").on("click", () => {
  $(".reg-box").hide();
  $(".login-box").show();
});

const form = layui.form;
const layer = layui.layer;
form.verify({
  repass: (value) => {
    //value：表单的值、item：表单的DOM对象
    const pwd = $(".reg-box [name = password]").val();
    if (pwd !== value) return "两次密码不一致";
  },
  //我们既支持上述函数式的方式，也支持下述数组的形式
  //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
  pass: [/^[\S]{6,12}$/, "密码必须6到12位,且不能出现空格"],
});

// 公共文档链接
// const baseUrl = "http://www.liulongbin.top:3007";

$("#form_reg").on("submit", function (e) {
  e.preventDefault();
  const data = $(this).serialize();
  // 阻止默认提交事件
  $.ajax({
    type: "POST",
    url: "/api/reguser",
    data,
    success: (res) => {
      const { message, status } = res;
      if (status !== 0) return layer.msg(message);
      // 模拟去登陆按钮的点击事件
      $("#link_login").click();
    },
  });
});

$("#form_login").on("submit", function (e) {
  e.preventDefault();
  const data = $(this).serialize();
  $.ajax({
    type: "POST",
    url: "/api/login",
    data,
    success: (res) => {
      const { message, status, token } = res;
      if (status !== 0) return layer.msg(message);
      localStorage.setItem("token", token);
      location.href = "/index.html";
    },
  });
});
