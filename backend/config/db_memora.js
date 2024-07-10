const {MongoClient} = require('mongodb')
async function main(){
    //Memora Cluster
    const uri = "mongodb+srv://qihengchang1014:nmntY6pkVbZ9QfdV@memoracluster.nzggb9c.mongodb.net/?retryWrites=true&w=majority&appName=MemoraCluster"

    const client = new MongoClient(uri);

    try{
        await client.connect();
    } catch (e){
        console.error(e);
    } finally{
        await client.close();
    }   
}

