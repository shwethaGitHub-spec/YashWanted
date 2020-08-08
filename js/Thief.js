class Thief{

    constructor(){
        this.name = null;
        this.age = 0;
        this.gender = null;
        //this.imagePath = null;
        this.addressOfLastCrime = null;
        this.index = 6;
    }

    //creates the function for getting the thief count from the database
    async getCount(){
      await database.ref('Records/thiefCount')
      .once("value").then((data)=>{
        thiefCount = data.val();
        console.log(thiefCount);
      });
      /*var thiefCountRef = database.ref('Records/thiefCount');
        await thiefCountRef.on("value",(data)=>{
            thiefCount = data.val();
            console.log(thiefCount);
      });*/
        
    }
    
    //creates the function for updating the thief count from the database
    updateCount(count){
      database.ref('Records/').update({
        thiefCount: count
      });
    }

    //updates the databse and creates a new node for uploading theif details in police screen
    update(){  
      console.log("Inside update");  
      var thiefIndex = "Records/Thief/Thief" + this.index;
      console.log("thiefIndex" + thiefIndex);
      database.ref(thiefIndex).set({
        Name:this.name,
        Age:this.age,
        Gender:this.gender,
        addressOfLastCrime:this.addressOfLastCrime
    });
    }
    
    //creates the function for getting the thief's information
    static async getThiefInfo(){
      await database.ref('Records/Thief')
      .once("value").then((data)=>{
        allThieves = data.val();
      });
    }
}