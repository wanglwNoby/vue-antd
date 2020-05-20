<template>
    <div :class="$style.loginContainer">
        <div :class="$style.banner">
            <img :src="logoUrl" alt="empBasic" />
            <h1>{{ $t('BDN00013001011') }}</h1>
        </div>
        <a-form :form="form" :class="$style.loginForm" layout="inline" @submit="handleSubmit">
            <a-form-item>
                <a-input
                    v-decorator="['username',{ rules: [{ required: true, message: $t('LOGIN000000001') }] }]"
                    placeholder="Username"
                >
                    <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-input
                    v-decorator="['password',{ rules: [{ required: true, message: $t('LOGIN000000002') }] }]"
                    type="password"
                    placeholder="Password"
                >
                    <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-button type="primary" html-type="submit">
                    <a-icon type="login" />
                </a-button>
            </a-form-item>
        </a-form>

        <draggable-modal
            :visible="visible"
            :title="$t('COM10100000040004')"
            :width="600"
            :onOk="handleOk"
            :onCancel="handleCancel"
        >
            <p :style="{color: 'red'}">{{ warningMsg }}</p>
            <a-row>
                <a-col :span="8">{{ $t('COM10100000040002') }}</a-col>
                <a-col :span="16">
                    <a-input-password v-model="newPasswordOnce" />
                </a-col>
            </a-row>
            <a-row>
                <a-col :span="8">{{ $t('COM10100000040003') }}</a-col>
                <a-col :span="16">
                    <a-input-password v-model="newPasswordTwice" />
                </a-col>
            </a-row>
        </draggable-modal>
    </div>
</template>

<script>
import DraggableModal from "../../components/DraggableModal";
import { _login, _changePassword } from "../../apis/global";

export default {
    name: "Login",
    components: {
        DraggableModal
    },
    data() {
        return {
            logoUrl: require("../../assets/logo.png"),
            form: this.$form.createForm(this, { name: "loginForm" }),
            oldPassword: "",
            visible: false,
            warningMsg: "",
            newPasswordOnce: "",
            newPasswordTwice: ""
        };
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    const pwdBase64 = window.btoa(values.password);
                    this.oldPassword = pwdBase64;
                    const data = {
                        account: values.username,
                        password: pwdBase64
                    };
                    this.login(data);
                }
            });
        },
        async login(data) {
            const res = await _login(data);
            if (res && res.result) {
                sessionStorage.setItem("empBasic", JSON.stringify(res.data));
                if (res.code === 1014 || res.code === 1015) {
                    this.visible = true;
                    this.warningMsg = res.msg;
                } else if (res.code === 1016) {
                    this.$confirm({
                        title: "修改密码",
                        content: res.msg,
                        onOk() {
                            this.visible = true;
                            this.warningMsg = res.msg;
                        },
                        onCancel() {
                            this.$router.replace("/");
                        }
                    });
                } else {
                    this.$router.replace("/");
                }
            } else {
                this.$message.error(res.msg);
            }
        },
        handleOk() {
            if (this.state.newPasswordOnce !== this.state.newPasswordTwice) {
                this.$message.error("新密码与旧密码不一致");
                return;
            }
            this.changePassword();
        },
        async changePassword() {
            const res = await _changePassword({
                type: "login",
                oldpassword: this.state.oldPassword,
                newpassword: window.btoa(this.state.newPasswordOnce)
            });
            this.visible = false;
            if (res && res.result) {
                this.$router.replace("/");
            } else {
                sessionStorage.removeItem("empBasic");
                this.$message.error(res.msg);
            }
        },
        handleCancel() {
            sessionStorage.removeItem("empBasic");
            this.visible = false;
        }
    }
};
</script>

<style lang="less" module>
@import "./login.less";
</style>