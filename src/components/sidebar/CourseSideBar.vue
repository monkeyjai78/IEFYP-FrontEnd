<template>
    <sidebar-menu
        :collapsed="collapsed"
        :menu="menu"
        :relative="!isOnMobile"
        @update:collapsed="onToggleCollapse"
        @item-click="onItemClick"
        :theme="selectedTheme"
    ></sidebar-menu>
</template>

<script>
import db from "../chatroom/firebase";
import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import {
    getStorage,
    ref,
    getDownloadURL
} from "firebase/storage";
import {
    ref as rtdbref,
    onValue,
} from "firebase/database";
const auth = getAuth();
const storage = getStorage();
export default {
    name: 'SideBar',
    data() {
        return {
            role: 'user',
            collapsed: false,
            isOnMobile: false,
            menu: [
                {
                    header: 'CUTE'

                },
                {
                    href: '/oil',
                    title: 'Price',
                    icon: 'fa fa-bars-staggered',
                },
                {
                    href: '/price',
                    title: 'Analysis',
                    icon: 'fa fa-user'
                },

            ],
        };
    },
    methods: {
        onResize() {
            if (window.innerWidth <= 767) {
                this.isOnMobile = true
                this.collapsed = true
            } else {
                this.isOnMobile = false
                this.collapsed = false
            }
        }
    },
    mounted() {
        this.onResize()
        window.addEventListener('resize', this.onResize);

    },
    watch: {
    },
    created() {
    }
}
</script>

<style>
.sidebar {
    background-color: #f0f0f0;
    padding-top: 5vh;
    height: 100vh;

    position: -webkit-sticky;
    position: sticky;
    top: 0;
    text-align: center;
    margin-left: 0px;
    margin-right: 0px;
}

.logo {
    display: block;
    margin-left: auto;
    margin-right: auto;
}

i {
    margin: 0px 0.5vw;
}

.propic {
    height: 200px;
}
</style>