import { MovieService } from '../services/movie.service';
import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from './store';
import { Movie } from '../entities/movie';

@Injectable({ providedIn: 'root' })
export class MovieActions {
  constructor(private ngRedux: NgRedux<AppState>, private movieService: MovieService) { }

  static IS_CREATING_MOVIE: string = 'IS_CREATING_MOVIE';
  static LOG_IN: string = 'LOG_IN';
  static CREATE_MOVIE: string = 'CREATE_MOVIE';
  static UPDATE_MOVIE: string = 'UPDATE_MOVIE';
  static DELETE_MOVIE: string = 'DELETE_MOVIE';

  static GET_MOVIES_LOADING: string = 'GET_MOVIES_LOADING';
  static GET_MOVIES_SUCCESS: string = 'GET_MOVIES_SUCCESS';
  static GET_MOVIES_FAILED: string = 'GET_MOVIES_FAILED';


  getMovies(): void {
    this.ngRedux.dispatch({ type: MovieActions.GET_MOVIES_LOADING });

    // call the ws
    this.movieService.getMovies().subscribe(movies => {
        this.ngRedux.dispatch({
          type: MovieActions.GET_MOVIES_SUCCESS,

          payload: movies
        })
      }, error => {
        this.ngRedux.dispatch({
          type: MovieActions.GET_MOVIES_FAILED,
          payload: error
        })
      });
        
  }
  
  createMovie(movie: Movie): void {

    this.movieService.createMovie(movie).subscribe(movie => {
      this.ngRedux.dispatch({
        type: MovieActions.CREATE_MOVIE,
        payload: movie
      });
    })
    
  }

  deleteMovie(movie: Movie): void {
    this.ngRedux.dispatch({
      type: MovieActions.DELETE_MOVIE,
      payload: movie
    });
  }

  editMovie(movie: Movie): void {
    this.ngRedux.dispatch({
      type: MovieActions.UPDATE_MOVIE,
      payload: movie
    });
    
  }

  setLoggedIn(isLoggedIn: boolean): void {
    this.ngRedux.dispatch({
      type: MovieActions.LOG_IN,
      payload: isLoggedIn
    })

  }
}
