import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { filter, fromEvent, switchMap,map, debounceTime} from 'rxjs';
import {ajax, AjaxResponse} from 'rxjs/ajax'

@Component({
  selector: 'app-input-event',
  templateUrl: './input-event.component.html',
  styleUrls: ['./input-event.component.css']
})
export class InputEventComponent implements OnInit {

  @ViewChild('search',{static:true}) search!:ElementRef<HTMLInputElement>

  // ngOnInit(): void {
  //   const searchObs=fromEvent(this.search.nativeElement,"input")
  //   searchObs.subscribe((value:any)=>{
  //     console.log(value.target.value)
  //   })
  // }
list:any
  ngOnInit(): void {

    // TypeAhead
    const searchObs=fromEvent(this.search.nativeElement,"input")
                    .pipe(
                      debounceTime(1000),
                      filter((e:any)=>e.target.value!=""),
                      switchMap((e:any)=>{
                        return ajax(`https://api.github.com/search/users?q=${e.target.value}`) 
                      }),
                      map((e:any)=>e.response.items)
                    )
    searchObs.subscribe((value:any)=>{
      console.log(value)
      this.list=value
      console.log("this is list"+this.list)
    })
  }



}
