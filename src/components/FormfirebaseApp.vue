<template>
  <div class="container">
  <h1 class='main-title'>{{ Title }}</h1>
    <div class="maindiv">
    <div class="seconddiv">
      <form class="w-full max-w-lg max-w-sm">
      <div class="form-control" >
        <label class="w-4/12"><b>Name</b></label>
        <input type='text' class="shadow appearance-none border rounded w-8/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="item.name" v-on:change="changePercentage('name')"/>
      </div>
      <div class="form-control">
        <label class="w-4/12"><b>Bithday</b></label>
        <input type='date' class="shadow appearance-none border rounded w-8/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="item.date" v-on:change="changePercentage('date')"/> 
      </div>
      <div class="form-control ">
        <label class="w-4/12"><b>Email</b></label>
        <input type='email' class="shadow appearance-none border rounded w-8/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="item.email" v-on:change="changePercentage('email')"/>
      </div>
      <div class="form-control">
        <label class="w-4/12"><b>Gender</b></label>
        <select v-model="item.gender" placeholder="Gender" class=" shadow appearance-none border rounded w-8/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-on:change="changePercentage('gender')">
          <option disable selected>select Gender</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
      </select>
    </div>
    <div class="form-control">
      <label class="w-4/12"><b>Phone Number</b></label>
      <input type="number" class="shadow appearance-none border rounded w-8/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  placeholder="Phone Number" v-model="item.phonenumber" v-on:change="changePercentage('phonenumber')"/>
    </div>
    <div class="flex  border-b border-teal-500 py-2">
        <span>Form compleated &nbsp;</span>
        <span class="percent-number">&nbsp;{{percentage}}% &nbsp;/ 100% </span> 
        <button  v-on:click="Submit" class="btn-save flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded " type="button">
          Register User
        </button>
      </div>
    </form>
  </div>
  <div class="percentage seconddiv">
  </div>
  </div >
  <table class="table-fixed">
  <thead>
    <tr >
      <th class="w-1/2 px-4 py-2">Name</th>
      <th class="w-1/4 px-4 py-2">Bithday</th>
      <th class="w-1/4 px-4 py-2">Email</th>
      <th class="w-1/4 px-4 py-2">Gender</th>
    </tr>
  </thead>
  <tbody>
    <tr i class='unstyle' v-for="user in listUser" :key="user.email">
      <td class="border px-4 py-2 ">{{ user.name }}</td>
      <td class="border px-4 py-2">{{user.date}}</td>
      <td class="border px-4 py-2">{{user.email}}</td>
      <td class="border px-4 py-2">{{user.gender}}</td>
    </tr>
  </tbody>
</table>
</div>
</template>

<script>
import dbFirebase from '../config/config-firebase.ts'
export default {
  name: 'FormfirebaseApp',
  props: {
    Title: String,
  },
  data() {
    return {
      collectionName: 'userform',
      item: {
        name: null,
        date: null,
        email: null,
        gender: null,
        phonenumber: null
      },
      listUser: [],
      percentage: 0,
      percentageitem: {
        name: 0,
        date: 0,
        email: 0,
        gender: 0,
        phonenumber:0
      }
    }
  },
  async mounted(){
    this.getdata()
  },
  methods:{
    changePercentage: function(key){
      if(this.item[key] === '' && this.percentageitem[key] === 20){
        this.percentageitem[key] = 0
      }
      else if(this.item[key] !== null && this.percentageitem[key] <= 0){
        this.percentageitem[key] = 20
      }
      this.percentage = Object.values(this.percentageitem).reduce((a, b) => a + b, 0)
    },
    Submit: function (e){
      e.preventDefault()
      const collection =  dbFirebase.collection(this.collectionName).add({...this.item})
      this.getdata()
      this.percentage = 0
      this.item = {
        name: null,
        date: null,
        email: null,
        gender: null,
        phonenumber: null
      }
    },
    getdata: async function (){
    const collection = await dbFirebase.collection(this.collectionName).get()
    const alldata = collection.docs.map(val=>{
      return val.data()
    })
    this.listUser = alldata;
  },
  }
}
</script>
<style>
.maindiv{
  display: "flex"
}
.seconddiv {
  flex: 1;
  width: 100%;
}
.main-title {
  font-size :"revert";
  font-size: 30px;
  margin-Bottom: 5%
}
.container{
  padding: "50%",
}
label{
  margin-right: 20%;
  display: block;
  width:100%;
}
.btn-save {
  margin-left: auto
}
.percentage{
  text-align: right
}
.percent-number{
  color: red;
}
.form-control{
  display: inline-flex;
  width: inherit
}
</style>