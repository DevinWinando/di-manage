<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Directory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'parent_id'
    ];

    public $with = ['parent'];

    public function parent()
    {
        return $this->belongsTo(Directory::class, 'parent_id')->select('id', 'name', 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Directory::class, 'parent_id');
    }
}
