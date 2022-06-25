<template>
<div style="min-height:100vh">
  <Toast />
  <ConfirmDialog :breakpoints="{ '960px': '75vw', '640px': '100vw' }" :style="{ width: '50vw' }"></ConfirmDialog>
    <div class="container">
        <div class="left">
            <SideBar />
        </div>
        <div class="right ">
            <apexchart type="line"  @dataPointSelection="dataPointSelectionHandler" :options="chartOptions" :series="series"></apexchart>
            <apexchart type="line"  @dataPointSelection="linedataPointSelectionHandler" :options="linechartOptions" :series="lineseries"></apexchart>
            <div style="display:flex;">
              <table style="">
                <tr>
                  <th>RNN Bert</th>
                </tr>
                <tr>
                  <th>accuracy</th>
                  <td>0.66</td>
                </tr>
                <tr>
                  <th>Correlation Coefficient (without thresholds)</th>
                  <td>0.253853389</td>
                </tr>
                <tr>
                  <th>Correlation Coefficient (with thresholds, number of data > 100)</th>
                  <td>0.529537691</td>
                </tr>
              </table>
              <table style="margin-left:10px">
                <tr>
                  <th>FinBert</th>
                </tr>
                <tr>
                  <th>accuracy</th>
                  <td>0.57</td>
                </tr>
                <tr>
                  <th>Correlation Coefficient (without thresholds)</th>
                  <td>0.267255271</td>
                </tr>
                <tr>
                  <th>Correlation Coefficient (with thresholds, number of data > 100)</th>
                  <td>0.423054086</td>
                </tr>
              </table>

            </div>
            <div style="display:flex;">
              <table style="">
                <tr>
                  <th>LSTM-CNN</th>
                </tr>
                <tr>
                  <th>accuracy</th>
                  <td>0.738</td>
                </tr>
                <tr>
                  <th>Correlation Coefficient (without thresholds)</th>
                  <td>0.363256732</td>
                </tr>
                <tr>
                  <th>Correlation Coefficient (with thresholds, number of data > 100)</th>
                  <td>0.515135076</td>
                </tr>
              </table>
              <table style="margin-left:10px">
                <tr>
                  <th>CNN-LSTM</th>
                </tr>
                <tr>
                  <th>accuracy</th>
                  <td>0.692</td>
                </tr>
                <tr>
                  <th>Correlation Coefficient (without thresholds)</th>
                  <td>0.231687980</td>
                </tr>
                <tr>
                  <th>Correlation Coefficient (with thresholds, number of data > 100)</th>
                  <td>0.487804689</td>
                </tr>
              </table>

            </div>

        </div>
    </div>
        <Dialog :header="selectedDate" v-model:visible="newsdisplay" :style="{width: '50vw'}">
          <DataTable :value="news" scrollable scrollHeight="400px" :virtualScrollerOptions="{ itemSize: 46 }">
                <Column field="created_at" header="Date" style="min-width: '200px'">
                  <template #body="slotProps">
                    <a :href="slotProps.data.link" v-if="slotProps.data.link!=null" >
                      {{slotProps.data.created_at}}
                    </a>
                    <div v-else >
                      {{slotProps.data.created_at}}
                    </div>
                      
                  </template>
                </Column>
                <Column field="text" header="Content" style="min-width: '200px'">
                </Column>
            </DataTable>
        </Dialog>
</div>
</template>


<script>
const dbRef = ref(db);
import VueApexCharts from 'vue-apexcharts'
  const auth = getAuth();
  import db from "./firebase";
  import {
    ref,
    set,
    push,
    onValue,
    update,
    get ,
    child,
  } from "firebase/database";
  import {
    getAuth,
    onAuthStateChanged
  } from "firebase/auth";
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
        chartOptions: {
          type: 'line',
          xaxis: {
            type: "datetime"
          },
          tooltip:{
            intersect: true,
            shared: false,
          },
          markers: {
              size: 1,
          },
          yaxis: [
            {
              show:true,
              max:1,
              min:-1
            },
            {
              show:true,
              opposite:true,
              max:130,
              min:60
            },
            {
              show:false,
              max:1,
              min:-1
            },
            {
              show:false,
              max:1,
              min:-1
            },
            {
              show:false,
              max:1,
              min:-1
            },
          ],
          stroke: {
            width: [3, 1,3,3,3]
          },
          title: {
            text: "CandleStick Chart",
            align: "left"
          },
        },
        series: [
          {
          name: 'RNN Bert',
          type: "line",
          data: []
        },
        {
          name: 'price',
          type: "candlestick",
          data: []
        }, {
          name: 'FinBert',
          type: 'line',
          data: []
        }, {
          name: 'lstm-cnn',
          type: 'line',
          data: []
        }, {
          name: 'cnn-lstm',
          type: 'line',
          data: []
        }
      ],
        linechartOptions: {
          type: 'line',
          xaxis: {
            type: "datetime"
          },
          tooltip:{
            intersect: true,
            shared: false,
          },
          markers: {
              size: 1,
          },
          yaxis: [
            {
              show:true,
              max:1,
              min:-1
            },
            {
              show:false,
              max:1,
              min:-1
            },
          ],
          stroke: {
            width: [3,3,3,3]
          },
          title: {
            text: "CandleStick Chart",
            align: "left"
          },
          tools:false
        },
        lineseries: [
          {
          name: 'RNNBert',
          type: "line",
          data: []
        }, {
          name: 'FinBert',
          type: 'line',
          data: []
        }, {
          name: 'lstm-cnn',
          type: 'line',
          data: []
        }, {
          name: 'cnn-lstm',
          type: 'line',
          data: []
        }
      ],
      }
    },
    methods: {
      linedataPointSelectionHandler(e, chartContext, config) {
        this.selectedPoint=config.dataPointIndex
        var serin = config.seriesIndex
        console.log(this.lineseries[serin].data[this.selectedPoint])
        var date=this.lineseries[serin].data[this.selectedPoint].x
        date= date
        this.selectedDate=date
        var news=[]
        var oilnews={
          created_at: date+'T09:33:00.000Z',
          text:'The crude oil market heads into another week of uncertainty, buffeted on one side by the ongoing war between Russia and Ukraine and the expansion of COVID-related lockdowns in China, the worlds largest crude importer Brent crude and U.S. West Texas Intermediate (WTI) crude surged last week. The two benchmarks gained 11.5% and 8.8%, respectively, on expectations that sanctions on Russia stemming from its invasion from Ukraine would start to bite into both its exports and production.',
          link:'https://economictimes.indiatimes.com/markets/commodities/news/uncertain-path-for-oil-markets-in-coming-days/articleshow/90485772.cms'
        }
        news.push(oilnews)
        get(child(dbRef, 'news')).then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
                if (childSnapshot.val()['created_at'].startsWith(date))
                  news.push(childSnapshot.val())
            })
            this.news = news

            
        });
        this.newsdisplay=true
      },
      dataPointSelectionHandler(e, chartContext, config) {
        console.log("asd")
        console.log(config)
        var serin = config.seriesIndex
        this.selectedPoint=config.dataPointIndex
        var date=this.series[serin].data[this.selectedPoint].x
        if (serin ==1){
          date= date.toISOString().split('T')[0]
        }else{
          date= date
        }
        
        this.selectedDate=date
        var news=[]
        var oilnews={
          created_at: date+'T09:33:00.000Z',
          text:'The crude oil market heads into another week of uncertainty, buffeted on one side by the ongoing war between Russia and Ukraine and the expansion of COVID-related lockdowns in China, the worlds largest crude importer Brent crude and U.S. West Texas Intermediate (WTI) crude surged last week. The two benchmarks gained 11.5% and 8.8%, respectively, on expectations that sanctions on Russia stemming from its invasion from Ukraine would start to bite into both its exports and production.',
          link:'https://economictimes.indiatimes.com/markets/commodities/news/uncertain-path-for-oil-markets-in-coming-days/articleshow/90485772.cms'
        }
        news.push(oilnews)
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
            })
            this.series[1].data = asd
            
        });
        get(child(dbRef, 'rnnbert')).then((snapshot) => {
            let asd=[]
            snapshot.forEach((childSnapshot) => {
                var data=[]
                var tmp ={};
                tmp.x =  childSnapshot.val().Date
                tmp.y=childSnapshot.val()['Average Score']
                asd.push(tmp)
            })
            this.series[0].data = asd
            this.lineseries[0].data=asd
            
        });
        get(child(dbRef, 'finbert')).then((snapshot) => {
            let asd=[]
            snapshot.forEach((childSnapshot) => {
                var data=[]
                var tmp ={};
                tmp.x =  childSnapshot.val().Date
                tmp.y=childSnapshot.val()['Average Score']
                asd.push(tmp)
            })
            this.series[2].data = asd
            this.lineseries[1].data=asd
            
        });
        get(child(dbRef, 'lstmcnn')).then((snapshot) => {
            let asd=[]
            snapshot.forEach((childSnapshot) => {
                var data=[]
                var tmp ={};
                tmp.x =  childSnapshot.val().Date
                tmp.y=childSnapshot.val()['Average Score']
                asd.push(tmp)
            })
            this.series[3].data = asd
            this.lineseries[2].data=asd
            
        });
        get(child(dbRef, 'cnnlstm')).then((snapshot) => {
            let asd=[]
            snapshot.forEach((childSnapshot) => {
                var data=[]
                var tmp ={};
                tmp.x =  childSnapshot.val().Date
                tmp.y=childSnapshot.val()['Average Score']
                asd.push(tmp)
            })
            this.series[4].data = asd
            this.lineseries[3].data=asd
            
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
table, th, td {
  border: 1px solid black;
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