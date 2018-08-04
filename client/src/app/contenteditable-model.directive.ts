// I found this at https://stackoverflow.com/questions/35378087/how-to-use-ngmodel-on-divs-contenteditable-in-angular2
// in tobek answer
import {Directive, ElementRef, Input, Output, EventEmitter, SimpleChanges, HostListener} from '@angular/core';

@Directive({
  selector: '[appContenteditableModel]'
})
export class ContenteditableModelDirective {

  @Input('appContenteditableModel') model: string;
  @Output('appContenteditableModelChange') update = new EventEmitter();

  /**
   * By updating this property on keyup, and checking against it during
   * ngOnChanges, we can rule out change events fired by our own onKeyup.
   * Ideally we would not have to check against the whole string on every
   * change, could possibly store a flag during onKeyup and test against that
   * flag in ngOnChanges, but implementation details of Angular change detection
   * cycle might make this not work in some edge cases?
   */
  
  private lastViewModel: string;

  constructor(private elRef: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['model'] && changes['model'].currentValue !== this.lastViewModel) {
      this.lastViewModel = this.model;
      this.refreshView();
    }
  }

  /** This should probably be debounced. */
  @HostListener('keyup') onKeyUp() {
    let value = this.elRef.nativeElement.textContent;
    this.lastViewModel = value;
    this.update.emit(value);
  }

  private refreshView() {
    this.elRef.nativeElement.textContent = this.model
  }
}
