import { Component } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { filter, map,shareReplay,tap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ngOnInit(){
    //obserable ---.who emits the data
    const obj1=new Observable((Subscriber)=>{
      console.log("inside observable")
      Subscriber.next({name:"sadique",age:21,project:1});
      // Subscriber.next({name:"ali",age:22,project:0});
      // Subscriber.next({name:"Mansuri",age:20,project:1});
      Subscriber.complete();
    }).pipe(
      tap((xyz:any)=>{
        console.log("Inside pipe")
        //side effects
        // if(xyz.project==0){
        //   throw new Error(xyz.name+" is not compeleted any project");
        // }
      }),
      filter((name:any)=>name.age>20),          //filter is use to filter data on basis on some requirement
      map((name:any)=> name.name),               // after geting filter data comes in map operator
      shareReplay()
    )

    //subscriber/observer ---> who consumes the emited  data
    obj1.subscribe({
      // next:(values)=>console.log(values),    //use to catch data
      error:(err)=>console.log(err.message),  // use to catch error
      complete:()=>console.log("emiting has been done") //use for confirmating and in obserable after compelte() nothing will run
    })

    obj1.subscribe({
      // next:(values)=>console.log(values),    //use to catch data
      error:(err)=>console.log(err.message),  // use to catch error
      complete:()=>console.log("emiting has been done") //use for confirmating and in obserable after compelte() nothing will run
    })
  }
}
