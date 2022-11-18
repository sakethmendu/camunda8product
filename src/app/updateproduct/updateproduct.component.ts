import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css']
})
export class UpdateproductComponent implements OnInit {

  constructor(private apollo: Apollo, private http: HttpClient) { }

  tasklist = [];

  expande: boolean[] = [];

  isLoading: boolean = true;

  GET_TASKS = gql`
  {
    tasks(query: { state: CREATED, assigned: false }) {
      id
    name
    processName
    completionTime
    assignee
    variables {
          value
          name
        }
    taskState
    sortValues
    isFirst
    formKey
    processDefinitionId
    taskDefinitionId
    creationTime
    }
  }
`;

  CLAIM_TASKS = gql`
  mutation claimTask ($id: String!) {
    claimTask(taskId: $id)   {
        id
        assignee
    }
}
`;



  ngOnInit(): void {
    this.http.post(`http://localhost:8082/api/login?username=demo&password=demo`, '').subscribe((data: any) => {
    })
    this.getUnclaimedtasks()
  }

  getUnclaimedtasks() {
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

  expand(i: number) {
    this.expande[i] = !this.expande[i]
  }


  claim(id: string) {
    this.isLoading=true
    this.apollo
      .mutate({
        mutation: this.CLAIM_TASKS,
        variables: {
          "id": id,
        }
      }).subscribe(data => { 
        window.location.reload() })

  }


}
