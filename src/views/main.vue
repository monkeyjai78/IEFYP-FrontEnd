<template>
<div style="min-height:100vh">
  <Toast />
  <ConfirmDialog :breakpoints="{ '960px': '75vw', '640px': '100vw' }" :style="{ width: '50vw' }"></ConfirmDialog>
    <div class="container">
        <div class="left">
            <SideBar />
        </div>
        <div class="right ">
            <div style="display:flex">
              <div style="background: #f6f5ee; font-size: 24px; width:50%">
                <div>
                  Closed Price:
                </div>
                <div style="text-align: center;    padding: 20px;font-size: 36px">
                  <i class="fa-solid fa-sort-up" style="color:green" v-if="this.lastprice[3]-this.lastprice[0]>0">{{numFilter(this.lastprice[3])}}</i>
                  <i class="fa-solid fa-sort-down" style="color:red" v-if="this.lastprice[3]-this.lastprice[0]<0">{{numFilter(this.lastprice[3])}}</i>
                  <i class="fa-solid fa-dash" v-if="this.lastprice[3]-this.lastprice[0]==0">{{numFilter(this.lastprice[3])}}</i>
                </div>
                <div style="display:flex; justify-content: space-between;">
                  <div>
                    Range: 
                  </div>
                  <div>
                    {{numFilter(this.lastprice[2])}}-{{numFilter(this.lastprice[1])}}
                  </div>
                  
                </div>
              </div>
              <div style="background: #f6f5ee; font-size: 24px; width:50%; margin-left:10px">
              <div>
                <div>
                  Change:
                </div>
                <div style="text-align: center;    padding: 20px;font-size: 36px">
                  <i class="fa-solid fa-sort-up" style="color:green" v-if="this.lastprice[3]-this.lastprice[0]>0">{{numFilter(this.lastprice[3]-this.lastprice[0])}}</i>
                  <i class="fa-solid fa-sort-down" style="color:red" v-if="this.lastprice[3]-this.lastprice[0]<0">{{numFilter(this.lastprice[3]-this.lastprice[0])}}</i>
                  <i v-if="this.lastprice[3]-this.lastprice[0]==0">{{numFilter(this.lastprice[3]-this.lastprice[0])}}</i>
                </div>
                <div>
                  Change (%):
                </div>
                <div style="text-align: center;    padding: 20px;font-size: 36px">
                  <i class="fa-solid fa-sort-up" style="color:green" v-if="this.lastprice[3]-this.lastprice[0]>0">{{pernumFilter((this.lastprice[3]-this.lastprice[0])/this.lastprice[0])}}%</i>
                  <i class="fa-solid fa-sort-down" style="color:red" v-if="this.lastprice[3]-this.lastprice[0]<0">{{pernumFilter((this.lastprice[3]-this.lastprice[0])/this.lastprice[0])}}%</i>
                  <i  v-if="this.lastprice[3]-this.lastprice[0]==0">{{pernumFilter((this.lastprice[3]-this.lastprice[0])/this.lastprice[0])}}%</i>
                </div>
              </div>
              </div>
              <div>

              </div>
            </div>
            <div id="chart">
              <apexchart type="candlestick" height="350" :options="chartOptions" :series="series"></apexchart>
            </div>
        </div>
    </div>
</div>
</template>


<script>
const dbRef = ref(db);
import VueApexCharts from 'vue-apexcharts'
  import db from "./firebase";
  import {
    ref,
    set,
    push,
    onValue,
    update,
    get ,
    child,
    orderByChild,
    equalTo ,
  } from "firebase/database";
  export default {
    name: "App",
    components: {
        ApexCharts: VueApexCharts,
    },
    data() {
      return {
        news:[],
        newsdisplay:false,
        selectedDate:null,
        selectedPoint:null,
        lastprice:[],
        series: [{
          data: []
        }],
        chartOptions: {
          chart: {
            type: 'candlestick',
            height: 350,
            
          },
          title: {
            text: 'CandleStick Chart',
            align: 'left'
          },
          xaxis: {
            type: 'datetime'
          },
          yaxis: {
            tooltip: {
              enabled: true
            }
          }
        },
      }
    },
    computed:{
        numFilter() {
          return(value)=>{
            
            let realVal = Number(value).toFixed(2)
            return Number(realVal)
          }
        },
        pernumFilter() {
          return(value)=>{
            
            let realVal = Number(value).toPrecision(3)
            return Number(realVal)
          }
        }
    },
    methods: {
      dataPointSelectionHandler(e, chartContext, config) {
        this.selectedPoint=config.dataPointIndex
        
        var date=this.series[0].data[this.selectedPoint].x
        date= date.toISOString().split('T')[0]
        this.selectedDate=date
        var news=[]
        get(child(dbRef, 'news')).then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
                if (childSnapshot.val()['created_at'].startsWith(date))
                  news.push(childSnapshot.val())
            })
            this.news = news

            
        });
        this.newsdisplay=true
      }
    },
    created() {
    },
    watch: {
    },
    mounted() {

        get(child(dbRef, 'price')).then((snapshot) => {
            let asd=[]
            snapshot.forEach((childSnapshot) => {
                var data=[]
                var tmp ={};
                tmp.x =  new Date (parseInt(childSnapshot.key))
                data.push(childSnapshot.val().Open)
                data.push(childSnapshot.val().High)
                data.push(childSnapshot.val().Low)
                data.push(childSnapshot.val().Close)
                tmp.y=data;
                asd.push(tmp)
                this.lastprice=tmp.y
            })
            this.series[0].data = asd
            
        });
          

    }
  };
</script>

<style scoped>
  body {
    background-color: #f4f7f6;
    margin-top: 20px;
  }

  .sending{
    background:green;
    color:white
  }
  .card {
    background: #fff;
    transition: .5s;
    border: 0;
    margin-bottom: 30px;
    border-radius: .55rem;
    position: relative;
    width: 100%;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
  }

  .chat-app .people-list {
    width: 280px;
    position: absolute;
    left: 10;
    top: 0;
    padding: 20px;
    z-index: 7
  }

  .chat-app .chat {
    margin-left: 280px;
    border-left: 1px solid #eaeaea
  }
  .name {
    font-weight: bold;
    text-decoration:inherit
  }
  .people-list {
    -moz-transition: .5s;
    -o-transition: .5s;
    -webkit-transition: .5s;
    transition: .5s
  }

  .people-list .chat-list li {
    padding: 10px 15px;
    list-style: none;
    border-radius: 3px
  }
    .unseen{
        background: red;
        color:white;
        border-radius: 99999px;
        width:25px;
        text-align: center;
        position: absolute;
        top: 0;
        right:0;
    }
  .people-list .chat-list li:hover {
    background: #efefef;
    cursor: pointer
  }

  .people-list .chat-list li.active {
    background: #efefef
  }

  .people-list .chat-list li .name {
    font-size: 15px
  }

  .people-list .chat-list img {
    width: 45px;
    border-radius: 50%
  }

  .people-list .about {
    float: left;
    padding-left: 8px
  }

  .people-list .status {
    color: #999;
    font-size: 13px
  }

  .chat .chat-header {
    padding: 15px 20px;
    border-bottom: 2px solid #f4f7f6
  }

  .chat .chat-header img {
    float: left;
    border-radius: 40px;
    width: 40px
  }

  .chat .chat-header .chat-about {
    float: left;
    padding-left: 10px
  }

  .chat .chat-history {
    padding: 20px;
    border-bottom: 2px solid #fff
  }

  .chat .chat-history ul {
    padding: 0
  }

  .chat .chat-history ul li {
    list-style: none;
    margin-bottom: 30px
  }

  .chat .chat-history ul li:last-child {
    margin-bottom: 0px
  }

  .left {
        flex: 2;
        min-height: 100%;
    }
    .right {
        flex: 10;
        padding: 0px 30px;
    }




  .online,
  .offline,
  .me {
    margin-right: 2px;
    font-size: 8px;
    vertical-align: middle
  }

  .online {
    color: #86c541
  }

  .offline {
    color: #e47297
  }

  .me {
    color: #1d8ecd
  }

  .float-right {
    float: right
  }

      .container {
        display: flex;
        min-height: 100vh;
        width: 100vw;
        padding: 0;
        max-width: unset;
    }
    .left {
        flex: 2;
        min-height: 100%;
    }
    .right {
        flex: 10;
        padding: 0px 30px;
    }

    @media screen and (max-width: 960px) {
    ::v-deep(.fc-header-toolbar) {
        display: flex;
        flex-wrap: wrap;
    }
    }
</style>