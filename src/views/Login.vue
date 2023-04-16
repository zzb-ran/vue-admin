<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { rlogin, rregister } from "@/api/user";

const router = useRouter();

const loginFromRef = ref();
const loginTabName = ref("login");
const loginFrom = reactive({
  username: "",
  password: "",
});
const registerFromRef = ref();
const registerFrom = reactive({
  username: "",
  password: "",
  code: "",
});

const loginRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 18, message: "密码长度为6~18位", trigger: "blur" },
  ],
});

const registerRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 18, message: "密码长度为6~18位", trigger: "blur" },
  ],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
});

function login(formEl) {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log("提交!");
      rlogin(loginFrom)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            ElMessage({
              type: "success",
              message: "登录成功",
            });
            router.push("/index");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("错误!");
      return false;
    }
  });
}

function register(formEl) {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log("提交!");
      console.log(registerFrom);
      rregister(registerFrom)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("错误!");
      return false;
    }
  });
}

function handleClick(tab) {
  loginTabName.value = tab.props.name;
}
</script>

<template>
  <div id="login">
    <el-tabs v-model="loginTabName" @tab-click="handleClick">
      <el-tab-pane label="登录" name="login"
        ><el-form
          ref="loginFromRef"
          :model="loginFrom"
          status-icon
          :rules="loginRules"
          label-width="120px"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="loginFrom.username"
              type="text"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="loginFrom.password"
              type="password"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login(loginFromRef)"
              >登录</el-button
            >
          </el-form-item>
        </el-form></el-tab-pane
      >
      <el-tab-pane label="注册" name="register"
        ><el-form
          ref="registerFromRef"
          :model="registerFrom"
          status-icon
          :rules="registerRules"
          label-width="120px"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="registerFrom.username"
              type="text"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="registerFrom.password"
              type="password"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input
              v-model="registerFrom.code"
              type="text"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="register(registerFromRef)"
              >注册</el-button
            >
          </el-form-item>
        </el-form></el-tab-pane
      >
    </el-tabs>
  </div>
</template>

<style scoped>
#login {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
