import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs';

@Component({
  selector: 'app-deleteproduct',
  templateUrl: './deleteproduct.component.html',
  styleUrls: ['./deleteproduct.component.css']
})
export class DeleteproductComponent implements OnInit {

  constructor(private apollo: Apollo, private http: HttpClient) { }

  tasklist = [];

  expande: boolean[] = [];

  isLoading: boolean = true;

  imageValid: string[] = [];

  GET_TASKS = gql`
  {
    tasks(query: {assignee: "demo" ,  state: CREATED }) {
      id
    name
    processName
    assignee
    variables {
          value
          name
        }
    taskState
    
    }
  }
`;

COMPLETE_TASK = gql`
mutation completeTask ($taskId: String!, $variables: [VariableInput!]!) {
  completeTask (taskId: $taskId, variables: $variables) {
      id
      name
      taskDefinitionId
      processName
      creationTime
      completionTime
      assignee
      variables {
          id
          name
          value
          previewValue
          isValueTruncated
      }
      taskState
      sortValues
      isFirst
      formKey
      processDefinitionId
      candidateGroups
  }
}
`;

  ngOnInit(): void {
    this.http.post(`http://localhost:8082/api/login?username=demo&password=demo`,'').subscribe((data: any) => {
      console.log(data)
    })

    this.apollo
      .watchQuery({
        query: this.GET_TASKS,
      })
      .valueChanges
      .pipe(
        map(result => result.data)
      ).subscribe((data: any) => {
        this.tasklist = data.tasks
        this.isLoading=false
      })

      
  }

  expand(i:number) {
    this.expande[i] = !this.expande[i]
  }

  completetask(id: string, i:number) {
    this.isLoading=true
    this.apollo
    .mutate({
      mutation: this.COMPLETE_TASK,
      variables: {
        "taskId": id,
        "variables": {
          "name": "imageValid",
          "value": this.imageValid[i]
        }
      }
    }).subscribe((data: any) => {
      this.isLoading=false
      window.location.reload()
    })
  }

}
