// ==UserScript==
// @name         youtube视频下载
// @namespace    https://github.com/
// @version      1.0
// @description  下载youtube视频：支持1080P/4K高清画质，点击即保存本地
// @author       youtube-大角牛软件科技
// @match        *://dajiaoniu.site/*
// @match        *://*.youtube.com/*
// @icon         https://www.youtube.com/favicon.ico
// @license      MIT
// @connect      youtube.com
// @connect      localhost
// @connect      *
// @grant        GM_addElement
// @grant        GM_addStyle
// @grant        GM_addValueChangeListener
// @grant        GM_cookie
// @grant        GM_deleteValue
// @grant        GM_deleteValues
// @grant        GM_download
// @grant        GM_getResourceText
// @grant        GM_getResourceURL
// @grant        GM_getTab
// @grant        GM_getTabs
// @grant        GM_getValue
// @grant        GM_getValues
// @grant        GM_info
// @grant        GM_listValues
// @grant        GM_log
// @grant        GM_notification
// @grant        GM_openInTab
// @grant        GM_registerMenuCommand
// @grant        GM_removeValueChangeListener
// @grant        GM_saveTab
// @grant        GM_setClipboard
// @grant        GM_setValue
// @grant        GM_setValues
// @grant        GM_unregisterMenuCommand
// @grant        GM_webRequest
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @antifeature  ads  服务器需要成本，感谢理解
// ==/UserScript==

/*
 * 查看许可（Viewing License）
 *
 * 版权声明
 * 版权所有 [大角牛软件科技]。保留所有权利。
 *
 * 许可证声明
 * 本协议适用于 [大角牛下载助手] 及其所有相关文件和代码（以下统称“软件”）。软件以开源形式提供，但仅允许查看，禁止使用、修改或分发。
 *
 * 授权条款
 * 1. 查看许可：任何人可以查看本软件的源代码，但仅限于个人学习和研究目的。
 * 2. 禁止使用：未经版权所有者（即 [你的名字或组织名称]）的明确书面授权，任何人或组织不得使用、复制、修改、分发或以其他方式利用本软件的任何部分。
 * 3. 明确授权：任何希望使用、修改或分发本软件的个人或组织，必须向版权所有者提交书面申请，说明使用目的、范围和方式。版权所有者有权根据自身判断决定是否授予授权。
 *
 * 限制条款
 * 1. 禁止未经授权的使用：未经版权所有者明确授权，任何人或组织不得使用、复制、修改、分发或以其他方式利用本软件的任何部分。
 * 2. 禁止商业使用：未经版权所有者明确授权，任何人或组织不得将本软件用于商业目的，包括但不限于在商业网站、应用程序或其他商业服务中使用。
 * 3. 禁止分发：未经版权所有者明确授权，任何人或组织不得将本软件或其任何修改版本分发给第三方。
 * 4. 禁止修改：未经版权所有者明确授权，任何人或组织不得对本软件进行任何形式的修改。
 *
 * 法律声明
 * 1. 版权保护：本软件受版权法保护。未经授权的使用、复制、修改或分发将构成侵权行为，版权所有者有权依法追究侵权者的法律责任。
 * 2. 免责声明：本软件按“原样”提供，不提供任何形式的明示或暗示的保证，包括但不限于对适销性、特定用途的适用性或不侵权的保证。在任何情况下，版权所有者均不对因使用或无法使用本软件而产生的任何直接、间接、偶然、特殊或后果性损害承担责任。
 *
 * 附加条款
 * 1. 协议变更：版权所有者有权随时修改本协议的条款。任何修改将在版权所有者通知后立即生效。
 * 2. 解释权：本协议的最终解释权归版权所有者所有。
 */

(e => { if (typeof GM_addStyle == "function") { GM_addStyle(e); return } const t = document.createElement("style"); t.textContent = e, document.head.append(t) })(' .download-assistant[data-v-29ed8f79]{position:fixed;bottom:2vw;right:2vw;z-index:999}.download-button[data-v-29ed8f79]{width:100px;height:100px;cursor:pointer;transition:all .5s cubic-bezier(.175,.885,.32,1.275);position:relative}.download-button[data-v-29ed8f79]:hover,.download-button.active[data-v-29ed8f79]{transform:scale(.35)}.fire[data-v-29ed8f79]{top:0;width:100px;height:100px;background-color:#ff8100;border-radius:50%;z-index:2;transform:scale(.3)}.download-button[data-v-29ed8f79]:before,.download-button[data-v-29ed8f79]:after{content:"";position:absolute;inset:30% 0 0 50%;width:250px;height:230px;background-color:#fbe05d33;border-radius:50%;z-index:1;animation:fireBlazes-29ed8f79 1s infinite linear}.download-button[data-v-29ed8f79]:after{width:300px;height:260px;animation-duration:1.4s;animation-direction:reverse}.fire__tongue[data-v-29ed8f79]{position:absolute;display:block;width:40px;height:50px;border-top:0;border-bottom:50px solid #ff8100;border-left:20px solid rgba(255,255,255,0);border-right:20px solid rgba(255,255,255,0);box-sizing:border-box}.fire__tongue--1[data-v-29ed8f79]{top:-22px;left:6px;animation:tonguesDance-29ed8f79 .3s infinite linear}.fire__tongue--2[data-v-29ed8f79]{top:-64px;left:0;right:0;height:70px;margin:auto;border-bottom:70px solid #ff8100;animation:tonguesDance-29ed8f79 .3s infinite -.2s linear}.fire__tongue--3[data-v-29ed8f79]{top:-17px;right:4px;animation:tonguesDance-29ed8f79 .3s infinite -.4s linear}.fire__eye[data-v-29ed8f79]{position:absolute;top:20px;width:14px;height:14px;background-color:#000;border-radius:50%;border:2px solid #ffffff;transform:rotate(45deg);animation:fireBlinks-29ed8f79 4s infinite linear}.fire__eye--right[data-v-29ed8f79]{left:24px}.fire__eye--left[data-v-29ed8f79]{right:24px}.fire__mouth[data-v-29ed8f79]{position:absolute;top:48px;left:0;right:0;width:24px;height:4px;margin:auto;background-color:#000;border-radius:2px;overflow:hidden;animation:fireChews-29ed8f79 8s infinite linear}.fire__food[data-v-29ed8f79]{position:absolute;top:52px;left:50px;width:80px;height:8px;background-color:#904612;border-radius:2px;transform:rotate(30deg);transform-origin:left;animation:fireEats-29ed8f79 8s infinite linear}.fire__food[data-v-29ed8f79]:after{content:"";position:absolute;top:-20px;right:-14px;width:16px;height:20px;background-color:#057d05;border-top-left-radius:84%;border-bottom-right-radius:84%}@keyframes tonguesDance-29ed8f79{0%{transform:translate(0)}33%{transform:translate(1px)}66%{transform:translate(-1px)}to{transform:translate(0)}}@keyframes fireBlinks-29ed8f79{0%{background-color:#000;border-color:#fff}50%{background-color:#000;border-color:#fff}51%{background-color:#fff0;border-top-color:#fff0;border-left-color:#fff0;border-bottom-color:#000;border-right-color:#000}53%{background-color:#fff0;border-top-color:#fff0;border-left-color:#fff0;border-bottom-color:#000;border-right-color:#000}54%{background-color:#000;border-color:#fff}to{background-color:#000;border-color:#fff}}@keyframes fireChews-29ed8f79{0%{height:4px;border-radius:2px}49%{height:4px;border-radius:2px}50%{height:24px;border-radius:50%}51%{height:4px}52%{height:24px}53%{height:4px}54%{height:24px}55%{height:4px}56%{height:24px}57%{height:4px}58%{height:24px}59%{height:4px;border-radius:50%}60%{height:4px;border-radius:2px;transform:translateY(0)}62%{transform:translateY(5px)}64%{transform:translateY(0)}66%{transform:translateY(5px)}68%{transform:translateY(0)}70%{transform:translateY(5px)}72%{transform:translateY(0)}to{height:4px}}@keyframes fireEats-29ed8f79{0%{opacity:0;width:80px}49%{opacity:0;width:80px}50%{opacity:1;width:80px}59%{opacity:1;width:0}60%{opacity:0;width:0}to{opacity:0;width:0}}@keyframes fireBlazes-29ed8f79{0%{transform:translate(-50%,-50%) rotate(0)}to{transform:translate(-50%,-50%) rotate(360deg)}}@media (max-width: 480px){.download-assistant[data-v-29ed8f79]{bottom:20px;right:20px}.download-button[data-v-29ed8f79]{width:70px;height:70px}}.webview-container[data-v-77791262]{position:relative;overflow:hidden}.loading-overlay[data-v-77791262]{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:#ffffffe6;z-index:10}.loading-spinner[data-v-77791262]{width:40px;height:40px;border:4px solid #f3f3f3;border-top:4px solid #3498db;border-radius:50%;animation:spin-77791262 1s linear infinite}.error-overlay[data-v-77791262]{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:#fffffff2;z-index:10}.error-content[data-v-77791262]{text-align:center;padding:20px}.error-content h3[data-v-77791262]{color:#e74c3c;margin-bottom:10px}.error-content p[data-v-77791262]{color:#666;margin-bottom:20px}.retry-btn[data-v-77791262]{background:#3498db;color:#fff;border:none;padding:10px 20px;border-radius:4px;cursor:pointer;font-size:14px}.retry-btn[data-v-77791262]:hover{background:#2980b9}.iframe[data-v-77791262]{width:100%;height:100%;border:none}@keyframes spin-77791262{to{transform:rotate(360deg)}}[data-v-33538bb2] .el-drawer__body{padding:0;height:100%;position:relative}.drawer-header[data-v-33538bb2]{height:50px;background:#fff;border-bottom:1px solid #e8e8e8;display:flex;align-items:center;justify-content:space-between;padding:0 20px}.header-title[data-v-33538bb2]{display:flex;align-items:center;gap:10px;color:#333;font-weight:500;font-size:15px}.header-icon[data-v-33538bb2]{font-size:20px}.header-text[data-v-33538bb2]{font-size:15px;letter-spacing:.3px;font-weight:bolder}.header-close-btn[data-v-33538bb2]{background:#ff4757;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;border-radius:50%;transition:all .2s;width:26px;height:26px;box-shadow:0 2px 4px #ff475733}.header-close-btn[data-v-33538bb2]:hover{background:#ff3838;box-shadow:0 4px 8px #ff47574d}.close-icon[data-v-33538bb2]{font-size:18px;color:#fff;font-weight:500}.drawer-content[data-v-33538bb2]{width:100%;height:calc(100% - 50px);overflow:hidden;display:flex;flex-direction:column}.disabled-content[data-v-33538bb2]{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 20px;text-align:center}.disabled-icon[data-v-33538bb2]{font-size:48px;margin-bottom:16px}.disabled-content p[data-v-33538bb2]{margin:0;color:#6c757d;font-size:14px}.el-drawer__header{margin-bottom:0!important}body{font-size:14px!important}a{text-decoration:none!important}:where(*,*:before,*:after){box-sizing:border-box}:where(html){-webkit-text-size-adjust:100%;-moz-text-size-adjust:100%;text-size-adjust:100%;line-height:1.15}:where(body){margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";line-height:1.5;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}:where(img,picture,video,canvas,svg,iframe,embed,object){display:block}:where(img,svg){height:auto}:where(iframe){border:0}:where(input,button,textarea,select){font:inherit;color:inherit}:where(button,[type=button],[type=reset],[type=submit]){-webkit-appearance:button}:where(textarea){resize:vertical}:where(fieldset){min-width:0;margin:0;padding:.35em .75em .625em;border:1px solid #a9a9a9}:where(legend){padding:0}:where(progress){vertical-align:baseline}:where(ol,ul){list-style:none;margin:0;padding:0}:where(blockquote,q){quotes:none}:where(blockquote:before,blockquote:after,q:before,q:after){content:"";content:none}:where(table){border-collapse:collapse;border-spacing:0}:where(th,td){padding:0;text-align:left}:where(main,article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section){display:block}:where(summary){display:list-item}:where(template,[hidden]){display:none}:where(:focus-visible){outline:2px solid Highlight;outline-offset:2px}:where(:focus:not(:focus-visible)){outline:0}:where(html){color-scheme:light dark}:where(html){scrollbar-width:thin;scrollbar-color:#888 transparent}::-webkit-scrollbar{width:8px;height:8px}::-webkit-scrollbar-thumb{background:#888;border-radius:4px}::-webkit-scrollbar-track{background:transparent}:where(iframe){width:100%} ');

(function (vue, ElementPlus) {
    'use strict';

    const _export_sfc = (sfc, props) => {
        const target = sfc.__vccOpts || sfc;
        for (const [key, val] of props) {
            target[key] = val;
        }
        return target;
    };
    const _sfc_main$2 = {
        name: "FireButton",
        props: {
            isProcessing: {
                type: Boolean,
                default: false
            }
        },
        emits: ["click"],
        methods: {
            handleClick() {
                this.$emit("click");
            }
        }
    };
    const _hoisted_1$2 = {
        id: "download-assistant",
        class: "download-assistant"
    };
    function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$2, [
            vue.createElementVNode("div", {
                class: vue.normalizeClass(["download-button fire", { active: $props.isProcessing }]),
                onClick: _cache[0] || (_cache[0] = (...args) => $options.handleClick && $options.handleClick(...args))
            }, _cache[1] || (_cache[1] = [
                vue.createStaticVNode('<span class="fire__tongue fire__tongue--1" data-v-29ed8f79></span><span class="fire__tongue fire__tongue--2" data-v-29ed8f79></span><span class="fire__tongue fire__tongue--3" data-v-29ed8f79></span><span class="fire__eye fire__eye--right" data-v-29ed8f79></span><span class="fire__eye fire__eye--left" data-v-29ed8f79></span><span class="fire__mouth" data-v-29ed8f79></span><span class="fire__food" data-v-29ed8f79></span>', 7)
            ]), 2)
        ]);
    }
    const FireButton = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-29ed8f79"]]);
    class WebViewCapabilities {
        constructor(config2) {
            this.config = config2;
            this.capabilities = /* @__PURE__ */ new Map();
        }
        /**
         * 注册能力
         */
        register(capability) {
            if (!capability.name) {
                return;
            }
            this.capabilities.set(capability.name, capability);
            if (typeof capability.onRegister === "function") {
                capability.onRegister(this.config);
            }
        }
        /**
         * 移除能力
         */
        unregister(name) {
            const capability = this.capabilities.get(name);
            if (capability && typeof capability.onUnregister === "function") {
                capability.onUnregister();
            }
            this.capabilities.delete(name);
        }
        /**
         * 处理消息
         */
        handleMessage(message2, event) {
            for (const [name, capability] of this.capabilities) {
                if (typeof capability.handleMessage === "function") {
                    try {
                        if (capability.handleMessage(message2, event, this.config)) {
                            return true;
                        }
                    } catch (error) {
                        console.error(`[DaJiaoNiu] 能力 ${name} 处理消息失败:`, error);
                    }
                }
            }
            return false;
        }
        /**
         * 获取能力
         */
        get(name) {
            return this.capabilities.get(name);
        }
        /**
         * 销毁能力系统
         */
        destroy() {
            for (const [name, capability] of this.capabilities) {
                if (typeof capability.onDestroy === "function") {
                    capability.onDestroy();
                }
            }
            this.capabilities.clear();
        }
    }
    const evalCapability = {
        name: "eval",
        onRegister(config2) {
            this.config = config2;
        },
        handleMessage(message2, event, config2) {
            if (message2.type === "eval") {
                this.handleEval(message2, config2);
                return true;
            }
            if (message2.type === "eval-sync") {
                this.handleEvalSync(message2, config2);
                return true;
            }
            return false;
        },
        handleEval(message, config) {
            const requestId = message.requestId;
            const { code } = message.data || message;
            try {
                const result = eval(code);
                if (result && typeof result.then === "function") {
                    result.then((resolvedResult) => {
                        config.sendResponse(requestId, resolvedResult);
                    }).catch((error) => {
                        config.sendError(requestId, error.message);
                    });
                } else {
                    config.sendResponse(requestId, result);
                }
            } catch (error) {
                config.sendError(requestId, error.message);
            }
        },
        handleEvalSync(message, config) {
            const { code } = message.data || message;
            try {
                eval(code);
            } catch (error) {
                console.error("[DaJiaoNiu] 同步执行代码失败:", error);
            }
        },
        onDestroy() {
        }
    };
    var _GM = /* @__PURE__ */ (() => typeof GM != "undefined" ? GM : void 0)();
    var _GM_addElement = /* @__PURE__ */ (() => typeof GM_addElement != "undefined" ? GM_addElement : void 0)();
    var _GM_addStyle = /* @__PURE__ */ (() => typeof GM_addStyle != "undefined" ? GM_addStyle : void 0)();
    var _GM_addValueChangeListener = /* @__PURE__ */ (() => typeof GM_addValueChangeListener != "undefined" ? GM_addValueChangeListener : void 0)();
    var _GM_cookie = /* @__PURE__ */ (() => typeof GM_cookie != "undefined" ? GM_cookie : void 0)();
    var _GM_deleteValue = /* @__PURE__ */ (() => typeof GM_deleteValue != "undefined" ? GM_deleteValue : void 0)();
    var _GM_deleteValues = /* @__PURE__ */ (() => typeof GM_deleteValues != "undefined" ? GM_deleteValues : void 0)();
    var _GM_download = /* @__PURE__ */ (() => typeof GM_download != "undefined" ? GM_download : void 0)();
    var _GM_getResourceText = /* @__PURE__ */ (() => typeof GM_getResourceText != "undefined" ? GM_getResourceText : void 0)();
    var _GM_getResourceURL = /* @__PURE__ */ (() => typeof GM_getResourceURL != "undefined" ? GM_getResourceURL : void 0)();
    var _GM_getTab = /* @__PURE__ */ (() => typeof GM_getTab != "undefined" ? GM_getTab : void 0)();
    var _GM_getTabs = /* @__PURE__ */ (() => typeof GM_getTabs != "undefined" ? GM_getTabs : void 0)();
    var _GM_getValue = /* @__PURE__ */ (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
    var _GM_getValues = /* @__PURE__ */ (() => typeof GM_getValues != "undefined" ? GM_getValues : void 0)();
    var _GM_info = /* @__PURE__ */ (() => typeof GM_info != "undefined" ? GM_info : void 0)();
    var _GM_listValues = /* @__PURE__ */ (() => typeof GM_listValues != "undefined" ? GM_listValues : void 0)();
    var _GM_log = /* @__PURE__ */ (() => typeof GM_log != "undefined" ? GM_log : void 0)();
    var _GM_notification = /* @__PURE__ */ (() => typeof GM_notification != "undefined" ? GM_notification : void 0)();
    var _GM_openInTab = /* @__PURE__ */ (() => typeof GM_openInTab != "undefined" ? GM_openInTab : void 0)();
    var _GM_registerMenuCommand = /* @__PURE__ */ (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
    var _GM_removeValueChangeListener = /* @__PURE__ */ (() => typeof GM_removeValueChangeListener != "undefined" ? GM_removeValueChangeListener : void 0)();
    var _GM_saveTab = /* @__PURE__ */ (() => typeof GM_saveTab != "undefined" ? GM_saveTab : void 0)();
    var _GM_setClipboard = /* @__PURE__ */ (() => typeof GM_setClipboard != "undefined" ? GM_setClipboard : void 0)();
    var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
    var _GM_setValues = /* @__PURE__ */ (() => typeof GM_setValues != "undefined" ? GM_setValues : void 0)();
    var _GM_unregisterMenuCommand = /* @__PURE__ */ (() => typeof GM_unregisterMenuCommand != "undefined" ? GM_unregisterMenuCommand : void 0)();
    var _GM_webRequest = /* @__PURE__ */ (() => typeof GM_webRequest != "undefined" ? GM_webRequest : void 0)();
    var _GM_xmlhttpRequest = /* @__PURE__ */ (() => typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : void 0)();
    var _unsafeWindow = /* @__PURE__ */ (() => typeof unsafeWindow != "undefined" ? unsafeWindow : void 0)();
    var _monkeyWindow = /* @__PURE__ */ (() => window)();
    const GM$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
        __proto__: null,
        GM: _GM,
        GM_addElement: _GM_addElement,
        GM_addStyle: _GM_addStyle,
        GM_addValueChangeListener: _GM_addValueChangeListener,
        GM_cookie: _GM_cookie,
        GM_deleteValue: _GM_deleteValue,
        GM_deleteValues: _GM_deleteValues,
        GM_download: _GM_download,
        GM_getResourceText: _GM_getResourceText,
        GM_getResourceURL: _GM_getResourceURL,
        GM_getTab: _GM_getTab,
        GM_getTabs: _GM_getTabs,
        GM_getValue: _GM_getValue,
        GM_getValues: _GM_getValues,
        GM_info: _GM_info,
        GM_listValues: _GM_listValues,
        GM_log: _GM_log,
        GM_notification: _GM_notification,
        GM_openInTab: _GM_openInTab,
        GM_registerMenuCommand: _GM_registerMenuCommand,
        GM_removeValueChangeListener: _GM_removeValueChangeListener,
        GM_saveTab: _GM_saveTab,
        GM_setClipboard: _GM_setClipboard,
        GM_setValue: _GM_setValue,
        GM_setValues: _GM_setValues,
        GM_unregisterMenuCommand: _GM_unregisterMenuCommand,
        GM_webRequest: _GM_webRequest,
        GM_xmlhttpRequest: _GM_xmlhttpRequest,
        monkeyWindow: _monkeyWindow,
        unsafeWindow: _unsafeWindow
    }, Symbol.toStringTag, { value: "Module" }));
    class RequestCapability {
        constructor() {
            this.name = "request";
            this.GM = GM$1;
            this.isGMAvailable = !!_GM_xmlhttpRequest;
            this.isBrowserEnv = typeof window !== "undefined" && typeof fetch !== "undefined";
        }
        /**
         * 通用请求函数
         * @param {Object} options - 请求配置
         * @param {string} options.method - HTTP 方法
         * @param {string} options.url - 请求 URL
         * @param {Object} options.headers - 请求头
         * @param {string} options.data - 请求体数据
         * @returns {Promise} 返回 Promise，resolve 的数据是解析后的响应
         */
        async request(options) {
            if (this.isGMAvailable) {
                return this.gmRequest(options);
            }
            if (this.isBrowserEnv) {
                return this.fetchRequest(options);
            }
            throw new Error("当前环境不支持发送 HTTP 请求");
        }
        /**
         * 使用油猴 GM API 发送请求
         */
        gmRequest(options) {
            const { method, url, headers, data } = options;
            return new Promise((resolve, reject) => {
                try {
                    this.GM.GM_xmlhttpRequest({
                        method: method || "GET",
                        url,
                        headers: headers || {},
                        data,
                        onload: function (response) {
                            try {
                                const parsedData = typeof response.responseText === "string" ? JSON.parse(response.responseText) : response.responseText;
                                resolve(parsedData);
                            } catch (e) {
                                resolve(response.responseText);
                            }
                        },
                        onerror: function (error) {
                            reject(new Error(`GM 请求失败: ${JSON.stringify(error)}`));
                        },
                        ontimeout: function () {
                            reject(new Error("GM 请求超时"));
                        }
                    });
                } catch (error) {
                    reject(new Error(`GM API 调用失败: ${JSON.stringify(error)}`));
                }
            });
        }
        /**
         * 使用浏览器原生 fetch API 发送请求
         */
        async fetchRequest(options) {
            const { method, url, headers, data } = options;
            try {
                const fetchOptions = {
                    method: method || "GET",
                    headers: headers || {}
                };
                if (data && method !== "GET" && method !== "HEAD") {
                    fetchOptions.body = data;
                }
                const response = await fetch(url, fetchOptions);
                if (!response.ok) {
                    throw new Error(`HTTP ${JSON.stringify(response)}`);
                }
                const responseText = await response.text();
                try {
                    return JSON.parse(responseText);
                } catch (e) {
                    return responseText;
                }
            } catch (error) {
                throw new Error(`Fetch 请求失败: ${JSON.stringify(error)}`);
            }
        }
        onRegister(config2) {
            this.config = config2;
        }
        handleMessage(message2, event, config2) {
            if (message2.type === "request") {
                this.handleRequest(message2, config2);
                return true;
            }
            return false;
        }
        async handleRequest(message2, config2) {
            const requestId2 = message2.requestId;
            const requestOptions = message2.data;
            try {
                const response = await this.request(requestOptions);
                config2.sendResponse(requestId2, response);
            } catch (error) {
                config2.sendError(requestId2, error.message);
            }
        }
        onDestroy() {
        }
    }
    const requestCapability = new RequestCapability();
    const _sfc_main$1 = {
        name: "WebView",
        props: {
            src: { type: String, required: true },
            width: { type: [String, Number], default: "100%" },
            height: { type: [String, Number], default: "100%" }
        },
        data() {
            return {
                loading: true,
                error: null,
                capabilities: null
            };
        },
        computed: {
            containerStyle() {
                return {
                    width: typeof this.width === "number" ? `${this.width}px` : this.width,
                    height: typeof this.height === "number" ? `${this.height}px` : this.height
                };
            }
        },
        mounted() {
            this.initCapabilities();
            window.addEventListener("message", this.handleMessage);
        },
        beforeDestroy() {
            window.removeEventListener("message", this.handleMessage);
            if (this.capabilities) {
                this.capabilities.destroy();
            }
        },
        methods: {
            initCapabilities() {
                this.capabilities = new WebViewCapabilities({
                    sendResponse: this.sendResponse,
                    sendError: this.sendError
                });
                evalCapability.onRegister({
                    sendResponse: this.sendResponse,
                    sendError: this.sendError,
                    capabilities: this.capabilities
                });
                this.capabilities.register(evalCapability);
                requestCapability.onRegister({
                    sendResponse: this.sendResponse,
                    sendError: this.sendError,
                    capabilities: this.capabilities
                });
                this.capabilities.register(requestCapability);
            },
            onLoad() {
                this.loading = false;
                this.error = null;
                this.$emit("load");
            },
            onError() {
                this.loading = false;
                this.error = "页面加载失败";
                this.$emit("error");
            },
            retry() {
                this.loading = true;
                this.error = null;
                this.$refs.iframeRef.src = this.src;
            },
            handleMessage(event) {
                try {
                    const message2 = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
                    if (message2?.type && this.capabilities) {
                        this.capabilities.handleMessage(message2, event);
                    }
                } catch (err) {
                }
            },
            sendResponse(requestId2, data) {
                const iframeWindow = this.$refs.iframeRef?.contentWindow;
                if (iframeWindow) {
                    iframeWindow.postMessage({ type: "response", data, requestId: requestId2 }, "*");
                }
            },
            sendError(requestId2, error) {
                const iframeWindow = this.$refs.iframeRef?.contentWindow;
                if (iframeWindow) {
                    iframeWindow.postMessage(
                        {
                            type: "error",
                            error: Object.prototype.toString.call(error) === "[object Object]" ? JSON.stringify(error) : error,
                            requestId: requestId2
                        },
                        "*"
                    );
                }
            }
        }
    };
    const _hoisted_1$1 = {
        key: 0,
        class: "loading-overlay"
    };
    const _hoisted_2$1 = {
        key: 1,
        class: "error-overlay"
    };
    const _hoisted_3$1 = { class: "error-content" };
    const _hoisted_4$1 = ["src"];
    function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
        return vue.openBlock(), vue.createElementBlock("div", {
            class: "webview-container",
            style: vue.normalizeStyle($options.containerStyle)
        }, [
            $data.loading ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$1, _cache[3] || (_cache[3] = [
                vue.createElementVNode("div", { class: "loading-spinner" }, null, -1)
            ]))) : vue.createCommentVNode("", true),
            $data.error ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2$1, [
                vue.createElementVNode("div", _hoisted_3$1, [
                    _cache[4] || (_cache[4] = vue.createElementVNode("h3", null, "加载失败", -1)),
                    vue.createElementVNode("p", null, vue.toDisplayString($data.error), 1),
                    vue.createElementVNode("button", {
                        onClick: _cache[0] || (_cache[0] = (...args) => $options.retry && $options.retry(...args)),
                        class: "retry-btn"
                    }, "重试加载组件")
                ])
            ])) : vue.createCommentVNode("", true),
            !$data.error ? (vue.openBlock(), vue.createElementBlock("iframe", {
                key: 2,
                ref: "iframeRef",
                src: $props.src,
                class: "iframe",
                onLoad: _cache[1] || (_cache[1] = (...args) => $options.onLoad && $options.onLoad(...args)),
                onError: _cache[2] || (_cache[2] = (...args) => $options.onError && $options.onError(...args))
            }, null, 40, _hoisted_4$1)) : vue.createCommentVNode("", true)
        ], 4);
    }
    const WebView = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-77791262"]]);
    const _sfc_main = {
        name: "App",
        components: {
            FireButton,
            WebView
        },
        data() {
            return {
                fireDialogVisible: false,
                config: null,
                loading: true
            };
        },
        async created() {
            await this.loadAppConfig();
        },
        computed: {
            currentSite() {
                if (!this.config) return { enabled: false, description: "配置加载中..." };
                const host = window.location.host;
                return this.config.UTILS.getCurrentSiteConfig(host);
            },
            isProduction() {
                console.log("isProduction：", true);
                return true;
            },
            currentWebViewSrc() {
                let url = this.isProduction ? this.currentSite.webviewSrc : this.currentSite.webviewSrcTest;
                return `${url}?t=${Date.now()}`;
            }
        },
        methods: {
            // 远程加载应用配置
            async loadAppConfig() {
                return new Promise((resolve, reject) => {
                    if (_unsafeWindow.$AppConfig) {
                        this.config = _unsafeWindow.$AppConfig;
                        this.loading = false;
                        resolve(this.config);
                        return;
                    }
                    _unsafeWindow.$AppConfigEndFn = (config2) => {
                        this.config = config2;
                        this.loading = false;
                        resolve(this.config);
                    };
                    const script = document.createElement("script");
                    script.src = "https://dajiaoniu.site/Monkeys/JS/app-config.js";
                    script.onerror = () => {
                        console.warn("[DaJiaoNiu] 无法加载配置文件，脚本加载失败");
                        resolve(null);
                    };
                    document.head.appendChild(script);
                });
            },
            // 显示火焰按钮弹窗
            showFireDialog() {
                this.fireDialogVisible = true;
            }
        }
    };
    const _hoisted_1 = { style: { "pointer-events": "none" } };
    const _hoisted_2 = {
        class: "drawer-header",
        style: { "pointer-events": "auto" }
    };
    const _hoisted_3 = { class: "header-title" };
    const _hoisted_4 = { class: "header-icon" };
    const _hoisted_5 = { class: "header-text" };
    const _hoisted_6 = {
        key: 0,
        class: "drawer-content"
    };
    const _hoisted_7 = {
        key: 1,
        class: "drawer-content disabled-content",
        style: { "pointer-events": "auto" }
    };
    const _hoisted_8 = {
        key: 2,
        class: "drawer-content disabled-content",
        style: { "pointer-events": "auto" }
    };
    function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
        const _component_FireButton = vue.resolveComponent("FireButton");
        const _component_WebView = vue.resolveComponent("WebView");
        const _component_el_drawer = vue.resolveComponent("el-drawer");
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
            vue.createVNode(_component_FireButton, {
                onClick: $options.showFireDialog,
                style: { "pointer-events": "auto" }
            }, null, 8, ["onClick"]),
            vue.createVNode(_component_el_drawer, {
                modelValue: $data.fireDialogVisible,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.fireDialogVisible = $event),
                size: $data.config?.UI_CONFIG?.drawerSize || 600,
                modal: $data.config?.UI_CONFIG?.modal || false,
                "lock-scroll": $data.config?.UI_CONFIG?.lockScroll || false,
                direction: $data.config?.UI_CONFIG?.drawerDirection || "rtl",
                "with-header": false,
                "append-to-body": $data.config?.UI_CONFIG?.appendToBody || false,
                "destroy-on-close": $data.config?.UI_CONFIG?.destroyOnClose || false
            }, {
                default: vue.withCtx(() => [
                    vue.createElementVNode("div", _hoisted_2, [
                        vue.createElementVNode("div", _hoisted_3, [
                            vue.createElementVNode("span", _hoisted_4, vue.toDisplayString($options.currentSite.icon || "📱"), 1),
                            vue.createElementVNode("span", _hoisted_5, vue.toDisplayString($options.currentSite.name || "大角牛脚本"), 1)
                        ]),
                        vue.createElementVNode("button", {
                            class: "header-close-btn",
                            onClick: _cache[0] || (_cache[0] = ($event) => $data.fireDialogVisible = false),
                            title: "关闭不影响程序运行"
                        }, _cache[2] || (_cache[2] = [
                            vue.createElementVNode("span", { class: "close-icon" }, "×", -1)
                        ]))
                    ]),
                    $options.currentSite.enabled ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_6, [
                        vue.createVNode(_component_WebView, {
                            src: $options.currentWebViewSrc,
                            style: { "pointer-events": "auto" }
                        }, null, 8, ["src"])
                    ])) : !$data.loading ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_7, [
                        _cache[3] || (_cache[3] = vue.createElementVNode("div", { class: "disabled-icon" }, "🚫", -1)),
                        vue.createElementVNode("p", null, vue.toDisplayString($options.currentSite.description || "暂不支持此网站"), 1)
                    ])) : (vue.openBlock(), vue.createElementBlock("div", _hoisted_8, _cache[4] || (_cache[4] = [
                        vue.createElementVNode("div", { class: "disabled-icon" }, "⏳", -1),
                        vue.createElementVNode("p", null, "配置加载中...", -1)
                    ])))
                ]),
                _: 1
            }, 8, ["modelValue", "size", "modal", "lock-scroll", "direction", "append-to-body", "destroy-on-close"])
        ]);
    }

    (function () {
        'use strict';
        try {
            const inFrame = window.top !== window.self;
            if (inFrame) {
                if (!window.location.pathname.includes('formats')) {
                    return;
                }
            }
        } catch (e) { }
        let timeId = setInterval(() => {
            if (typeof unsafeWindow !== 'undefined') {
                // 组装最小集 GM 能力并暴露到全局
                var _GM = /* @__PURE__ */ (() => typeof GM != "undefined" ? GM : void 0)();
                var _GM_addElement = /* @__PURE__ */ (() => typeof GM_addElement != "undefined" ? GM_addElement : void 0)();
                var _GM_addStyle = /* @__PURE__ */ (() => typeof GM_addStyle != "undefined" ? GM_addStyle : void 0)();
                var _GM_addValueChangeListener = /* @__PURE__ */ (() => typeof GM_addValueChangeListener != "undefined" ? GM_addValueChangeListener : void 0)();
                var _GM_cookie = /* @__PURE__ */ (() => typeof GM_cookie != "undefined" ? GM_cookie : void 0)();
                var _GM_deleteValue = /* @__PURE__ */ (() => typeof GM_deleteValue != "undefined" ? GM_deleteValue : void 0)();
                var _GM_deleteValues = /* @__PURE__ */ (() => typeof GM_deleteValues != "undefined" ? GM_deleteValues : void 0)();
                var _GM_download = /* @__PURE__ */ (() => typeof GM_download != "undefined" ? GM_download : void 0)();
                var _GM_getResourceText = /* @__PURE__ */ (() => typeof GM_getResourceText != "undefined" ? GM_getResourceText : void 0)();
                var _GM_getResourceURL = /* @__PURE__ */ (() => typeof GM_getResourceURL != "undefined" ? GM_getResourceURL : void 0)();
                var _GM_getTab = /* @__PURE__ */ (() => typeof GM_getTab != "undefined" ? GM_getTab : void 0)();
                var _GM_getTabs = /* @__PURE__ */ (() => typeof GM_getTabs != "undefined" ? GM_getTabs : void 0)();
                var _GM_getValue = /* @__PURE__ */ (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
                var _GM_getValues = /* @__PURE__ */ (() => typeof GM_getValues != "undefined" ? GM_getValues : void 0)();
                var _GM_info = /* @__PURE__ */ (() => typeof GM_info != "undefined" ? GM_info : void 0)();
                var _GM_listValues = /* @__PURE__ */ (() => typeof GM_listValues != "undefined" ? GM_listValues : void 0)();
                var _GM_log = /* @__PURE__ */ (() => typeof GM_log != "undefined" ? GM_log : void 0)();
                var _GM_notification = /* @__PURE__ */ (() => typeof GM_notification != "undefined" ? GM_notification : void 0)();
                var _GM_openInTab = /* @__PURE__ */ (() => typeof GM_openInTab != "undefined" ? GM_openInTab : void 0)();
                var _GM_registerMenuCommand = /* @__PURE__ */ (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
                var _GM_removeValueChangeListener = /* @__PURE__ */ (() => typeof GM_removeValueChangeListener != "undefined" ? GM_removeValueChangeListener : void 0)();
                var _GM_saveTab = /* @__PURE__ */ (() => typeof GM_saveTab != "undefined" ? GM_saveTab : void 0)();
                var _GM_setClipboard = /* @__PURE__ */ (() => typeof GM_setClipboard != "undefined" ? GM_setClipboard : void 0)();
                var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
                var _GM_setValues = /* @__PURE__ */ (() => typeof GM_setValues != "undefined" ? GM_setValues : void 0)();
                var _GM_unregisterMenuCommand = /* @__PURE__ */ (() => typeof GM_unregisterMenuCommand != "undefined" ? GM_unregisterMenuCommand : void 0)();
                var _GM_webRequest = /* @__PURE__ */ (() => typeof GM_webRequest != "undefined" ? GM_webRequest : void 0)();
                var _GM_xmlhttpRequest = /* @__PURE__ */ (() => typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : void 0)();
                var _unsafeWindow = /* @__PURE__ */ (() => typeof unsafeWindow != "undefined" ? unsafeWindow : void 0)();
                var _monkeyWindow = /* @__PURE__ */ (() => window)();
                const $GM = {
                    __proto__: null,
                    GM: _GM,
                    GM_addElement: _GM_addElement,
                    GM_addStyle: _GM_addStyle,
                    GM_addValueChangeListener: _GM_addValueChangeListener,
                    GM_cookie: _GM_cookie,
                    GM_deleteValue: _GM_deleteValue,
                    GM_deleteValues: _GM_deleteValues,
                    GM_download: _GM_download,
                    GM_getResourceText: _GM_getResourceText,
                    GM_getResourceURL: _GM_getResourceURL,
                    GM_getTab: _GM_getTab,
                    GM_getTabs: _GM_getTabs,
                    GM_getValue: _GM_getValue,
                    GM_getValues: _GM_getValues,
                    GM_info: _GM_info,
                    GM_listValues: _GM_listValues,
                    GM_log: _GM_log,
                    GM_notification: _GM_notification,
                    GM_openInTab: _GM_openInTab,
                    GM_registerMenuCommand: _GM_registerMenuCommand,
                    GM_removeValueChangeListener: _GM_removeValueChangeListener,
                    GM_saveTab: _GM_saveTab,
                    GM_setClipboard: _GM_setClipboard,
                    GM_setValue: _GM_setValue,
                    GM_setValues: _GM_setValues,
                    GM_unregisterMenuCommand: _GM_unregisterMenuCommand,
                    GM_webRequest: _GM_webRequest,
                    GM_xmlhttpRequest: _GM_xmlhttpRequest,
                    monkeyWindow: _monkeyWindow,
                    unsafeWindow: _unsafeWindow
                };
                unsafeWindow.$GM = $GM;
                window.$GM = $GM;
                unsafeWindow.$envInited = true;
                window.$envInited = true;
                clearInterval(timeId);
            }
        }, 100);
        // 添加自定义样式
        GM_addStyle(`
        #url-jump-container {
            position: fixed;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: red;
            color: white;
            border: none;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
        #url-jump-btn {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: transparent;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        #url-jump-btn:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
        #url-jump-btn::after {
            content: "⇓";
            font-weight: bold;
        }
        #drag-handle {
            position: absolute;
            top: -5px;
            right: -5px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: #444444;
            border: 2px solid white;
            cursor: move; /* 标准拖动光标 */
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 8px;
            color: white;
            font-family: Arial, sans-serif;
        }
        #drag-handle::after {
            content: "☰"; /* 汉堡菜单图标，表示可拖动 */
        }
        #drag-handle:hover {
            background-color: #666666;
            cursor: grab; /* 悬停时的抓取光标 */
        }
        #drag-handle:active {
            cursor: grabbing; /* 按住时的抓取中光标 */
        }
    `);
        if (
            window.location.origin.includes('localhost') ||
            window.location.origin.includes('127.0.0.1') ||
            window.location.origin.includes('dajiaoniu') ||
            window.location.origin.includes('dl-test.infiniteworlds.com.cn'))
            return;
        const container = document.createElement('div');
        container.id = 'url-jump-container';
        const jumpBtn = document.createElement('button');
        jumpBtn.id = 'url-jump-btn';
        jumpBtn.title = '点击获取当前页面资源';
        const dragHandle = document.createElement('div');
        dragHandle.id = 'drag-handle';
        dragHandle.title = '拖动移动位置';
        container.appendChild(jumpBtn);
        container.appendChild(dragHandle);

        // 从本地存储获取上次位置，没有则使用默认位置
        const savedPosition = GM_getValue('buttonPosition', {
            right: '2%',
            bottom: '2%'
        });
        container.style.right = savedPosition.right;
        container.style.bottom = savedPosition.bottom;

        jumpBtn.addEventListener('click', async function () {
            const currentHref = window.location.href;
            const currentUrl = encodeURIComponent(currentHref);
            let targetUrl = `https://dajiaoniu.site/Download/index.html`;
            //let targetUrl = `http://localhost:6688/Download/index.html`;
            let videoInfo = null;
            try {
                if (currentHref.includes("douyin")) {
                    try {
                        videoInfo = await extractVideoInfo();
                        if (videoInfo && videoInfo.d) {
                            targetUrl += `?url=${currentUrl}&x=${encodeURIComponent(videoInfo.d)}`;
                        }
                    } catch (e) {
                        alert(`douyin视频信息提取失败${e}`);
                        return;
                    }
                } else if (currentHref.includes("tiktok")) {
                    if (!localStorage.oldTiktoUser) {
                        const result = confirm("用户您好，本软件将复制视频链接，用于解析视频，请允许软件读取剪贴板。");
                        if (!result) {
                            alert("异常");
                            return;
                        }
                    }
                    // 有视频id的页面
                    if (currentHref.includes("/video/")) {
                        targetUrl += `?url=${currentHref}`;
                    } else {
                        // 有分享按钮的页面
                        try {
                            let videos = document.getElementsByTagName("video");
                            // 如果没有2个视频，则返回（当前可能不是视频）
                            if (videos.length < 2) {
                                alert("当前页面可能不是视频页面");
                                return;
                            }
                            let tiktokNowVideo = videos[0];
                            const articleElement = tiktokNowVideo.closest('article');
                            let scBtn = articleElement.querySelector('button[aria-label^="添加到收藏"], button[aria-label*="添加到收藏"]');
                            if (!scBtn) {
                                // 如果没有收藏按钮，则返回，当前可能是直播
                                alert("当前页面可能是直播页面");
                                return
                            }
                            articleElement.querySelector('button[aria-label^="分享视频"], button[aria-label*="分享视频"]').click();
                            for (let i = 0; i < 40; i++) {
                                if (document.querySelector('[data-e2e="share-copy"]')) {
                                    document.querySelector('[data-e2e="share-copy"]').click()
                                    break;
                                }
                                await sleep(100);
                            }
                            const copyUrl = await readClipboardTextCompat();
                            if (copyUrl) {
                                targetUrl += `?url=${copyUrl}`;
                            } else {
                                new Error(`获取剪贴板内容失败`);
                            }
                        } catch (e) {
                            alert(`tiktok视频信息提取失败${e}`);
                            return;
                        }
                    }
                    localStorage.oldTiktoUser = '1';
                } else {
                    targetUrl += `?url=${currentUrl}`;
                }
            } catch (e) {
                alert(`跳转失败${e}`);
                return;
            }
            GM_openInTab(targetUrl, { active: true });
        });
        let isDragging = false;
        let offsetX, offsetY;

        dragHandle.addEventListener('mousedown', function (e) {
            isDragging = true;
            const rect = container.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            e.stopPropagation();
            e.preventDefault();
        });

        document.addEventListener('mousemove', function (e) {
            if (!isDragging) return;
            const rightPx = window.innerWidth - e.clientX - (container.offsetWidth - offsetX);
            const bottomPx = window.innerHeight - e.clientY - (container.offsetHeight - offsetY);
            const rightPct = Math.max(0, Math.min(100, (Math.max(0, rightPx) / window.innerWidth) * 100));
            const bottomPct = Math.max(0, Math.min(100, (Math.max(0, bottomPx) / window.innerHeight) * 100));
            container.style.right = rightPct.toFixed(2) + '%';
            container.style.bottom = bottomPct.toFixed(2) + '%';
        });

        document.addEventListener('mouseup', function () {
            if (isDragging) {
                isDragging = false;

                // 保存当前位置到本地存储
                GM_setValue('buttonPosition', {
                    right: container.style.right,
                    bottom: container.style.bottom
                });
            }
        });

        document.body.appendChild(container);

        function extractVideoInfo() {
            return new Promise((resolve) => {
                let video = document.querySelector('video[autoplay="true"]');
                if (!video) {
                    video = document.querySelector('video[autoplay]');
                }
                if (!video) {
                    const videos = document.querySelectorAll('video');
                    for (let v of videos) {
                        if (v.autoplay) {
                            video = v;
                            break;
                        }
                    }
                }

                if (!video) {
                    resolve(null);
                    return;
                }
                video.src = "";
                const playerContainer = video.closest('.playerContainer');
                let title = "";

                if (playerContainer) {
                    const titleElem = playerContainer.querySelector('.title') || document.title;
                    if (titleElem) {
                        title = titleElem.innerText || titleElem.textContent;
                    }
                }
                title = title ? title.trim() : document.title;
                let checkCount = 0;
                const maxChecks = 50;
                const intervalTime = 100;

                const timer = setInterval(() => {
                    checkCount++;
                    const sources = video.querySelectorAll('source');
                    const srcs = [];

                    sources.forEach(source => {
                        if (source.src) {
                            srcs.push(source.src);
                        }
                    });
                    if (srcs.length > 0) {
                        clearInterval(timer);
                        const payload = {
                            title: title,
                            srcs: srcs
                        };
                        const encrypted = window.btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
                        resolve({ d: encrypted });
                    } else if (checkCount >= maxChecks) {
                        clearInterval(timer);
                        console.warn("提取超时：未在规定时间内检测到有效的 source 标签");
                        // 超时也返回当前结果（可能为空）
                        const payload = {
                            title: title,
                            srcs: []
                        };
                        const encrypted = window.btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
                        resolve({ d: encrypted });
                    }
                }, intervalTime);
            });
        };

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function readClipboardTextCompat(options = {}) {
            const timeout = typeof options.timeout === 'number' ? options.timeout : 8000;
            // 1. 优先使用标准 API
            try {
                if (navigator.clipboard && typeof navigator.clipboard.readText === 'function') {
                    const txt = await navigator.clipboard.readText();
                    if (txt && txt.length) return txt;
                }
            } catch (e) { }
            try {
                if (navigator.clipboard && typeof navigator.clipboard.read === 'function') {
                    const items = await navigator.clipboard.read();
                    for (const item of items || []) {
                        if (item.types && item.types.includes('text/plain')) {
                            const blob = await item.getType('text/plain');
                            const txt = await blob.text();
                            if (txt && txt.length) return txt;
                        }
                        if (item.types && item.types.includes('text/html')) {
                            const blob = await item.getType('text/html');
                            const html = await blob.text();
                            if (html && html.length) return html;
                        }
                    }
                }
            } catch (e) { }
            // 3. IE 旧接口
            try {
                if (window.clipboardData && typeof window.clipboardData.getData === 'function') {
                    const txt = window.clipboardData.getData('Text');
                    if (txt && txt.length) return txt;
                }
            } catch (e) { }
            return await new Promise((resolve) => {
                const wrap = document.createElement('div');
                wrap.style.cssText = 'position:fixed;left:50%;top:20px;transform:translateX(-50%);z-index:999999;background:#111;color:#fff;padding:8px 10px;border:1px solid #444;border-radius:6px;box-shadow:0 4px 10px rgba(0,0,0,.3);display:flex;gap:8px;align-items:center;';
                const tip = document.createElement('span');
                tip.textContent = '请按 Ctrl+V 粘贴内容到输入框';
                const input = document.createElement('input');
                input.type = 'text';
                input.placeholder = '在此粘贴';
                input.style.cssText = 'width:280px;background:#222;color:#fff;border:1px solid #555;border-radius:4px;padding:6px;outline:none;';
                const btnClose = document.createElement('button');
                btnClose.textContent = '关闭';
                btnClose.style.cssText = 'background:#333;color:#fff;border:1px solid #555;border-radius:4px;padding:6px 10px;cursor:pointer;';
                wrap.appendChild(tip);
                wrap.appendChild(input);
                wrap.appendChild(btnClose);
                document.body.appendChild(wrap);

                let done = false;
                const cleanup = () => {
                    if (wrap && wrap.parentNode) wrap.parentNode.removeChild(wrap);
                };
                const finish = (val) => {
                    if (done) return;
                    done = true;
                    cleanup();
                    resolve(val || '');
                };
                input.addEventListener('paste', (ev) => {
                    try {
                        const cd = ev.clipboardData || window.clipboardData;
                        let txt = '';
                        if (cd) {
                            txt = cd.getData && cd.getData('text/plain') || cd.getData && cd.getData('Text') || '';
                        }
                        if (!txt) {
                            setTimeout(() => finish(input.value || ''), 0);
                        } else {
                            ev.preventDefault();
                            input.value = txt;
                            finish(txt);
                        }
                    } catch (e) {
                        setTimeout(() => finish(input.value || ''), 0);
                    }
                });
                btnClose.addEventListener('click', () => finish(input.value || ''));
                input.focus();
                // 超时自动结束
                setTimeout(() => finish(input.value || ''), timeout);
            });
        }

    })();

})({}, {});